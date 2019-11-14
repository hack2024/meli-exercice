import * as functions from "firebase-functions";
import * as algoliasearch from "algoliasearch";
import { dbService } from "../services/db.service";

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("mutants");

export const datastore = functions.pubsub
  .topic("save-mutant")
  .onPublish(async message => {
    const dnaSequences: string[] = message.json.dnaSequences;
    const isMutant: boolean = message.json.isMutant;
    const sequencesJoined = dnaSequences.join("");
    const response = await index.search(sequencesJoined);
    // si no encontramos alguna secuencia la persistimos y actualizamos el indice de busqueda
    if (response.hits.length === 0) {
      // guardamos en base las sequencias de ADN
      await dbService.save(dnaSequences, isMutant);
      // actualizamos el indice de algolia
      await index.addObject({
        sequence: sequencesJoined
      });
    }
  });
