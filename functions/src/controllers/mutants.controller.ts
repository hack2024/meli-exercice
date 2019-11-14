import * as functions from "firebase-functions";
const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub();

import { validateRequest, validateDnaSequences } from "../utils/validators";
import { isMutant } from "../services/mutants.service";

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

const publishResults = (dnaSequences: string[], result: boolean) => {
  const topic = pubsub.topic("save-mutant");
  const messageObject = {
    dnaSequences: dnaSequences,
    isMutant: result
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), "utf8");
  return topic.publish(messageBuffer);
};
