import * as functions from "firebase-functions";
import { validateRequest, validateDnaSequences } from "./validators";
import { isMutant } from "./mutantsController";

/**
 * Endpoint que devuelve si un humano es mutante o no
 */
export const mutant = functions.https.onRequest(async (request, response) => {
  if (validateRequest(request) && validateDnaSequences(request.body.dna)) {
    const dnaSequences = request.body.dna;
    const result = await isMutant(dnaSequences);
    if (result) {
      response.status(200).send("We have a mutant!");
    } else {
      response.status(403).send("Ho! is a human ...");
    }
  } else {
    response.status(400).send("Invalid request");
  }
});
