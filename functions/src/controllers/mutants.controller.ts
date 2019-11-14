import * as functions from "firebase-functions";

import { validateRequest, validateDnaSequences } from "../utils/validators";
import { isMutant } from "../services/mutants.service";
import { dbService } from "../services/db.service";
import { publishResults } from "../services/topics.service";

/**
 * Endpoint que devuelve si un humano es mutante o no
 */
export const mutant = functions.https.onRequest(async (request, response) => {
  if (validateRequest(request) && validateDnaSequences(request.body.dna)) {
    const dnaSequences = request.body.dna;
    const result = isMutant(dnaSequences);
    if (result) {
      // enviamos a otro microservicio la sequencia para persistir
      // en este caso vamos a almacenar un mutante
      await publishResults(dnaSequences, result);
      response.status(200).send("Mutant!");
    } else {
      // enviamos a otro microservicio la sequencia para persistir
      // en este caso vamos a almacenar un humano
      await publishResults(dnaSequences, result);
      response.status(403).send("Human!");
    }
  } else {
    response.status(400).send("Invalid request");
  }
});

export const list = functions.https.onRequest(async (request, response) => {
  const documents = await dbService.list();
  response.status(200).send(documents);
});
