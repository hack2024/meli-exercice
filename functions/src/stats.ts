import * as functions from "firebase-functions";
import { dbService } from "./db";

export const stats = functions.https.onRequest(async (request, response) => {
  const stat = await dbService.getStats();
  response.status(200).send(stat);
});
