import * as functions from "firebase-functions";
const { PubSub } = require("@google-cloud/pubsub");

// Instantiates a client
const pubsub = new PubSub();

import { validateRequest, validateDnaSequences } from "../utils/validators";
import { isMutant } from "../services/mutants.service";

/**
 * Endpoint que devuelve si un humano es mutante o no
 */
export const mutant = functions.https.onRequest(async (request, response) => {
  if (validateRequest(request) && validateDnaSequences(request.body.dna)) {
    const dnaSequences = request.body.dna;
    const result = await isMutant(dnaSequences);
    if (result) {
      // enviamos a otro microservicio la sequencia para persistir
      // en este caso vamos a almacenar un mutante
      publishResults(dnaSequences, result);

      response.status(200).send("We have a mutant!");
    } else {
      // enviamos a otro microservicio la sequencia para persistir
      // en este caso vamos a almacenar un humano normal
      publishResults(dnaSequences, result);
      response.status(403).send("Ho! is a human ...");
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
  topic.publish(messageBuffer);
};
