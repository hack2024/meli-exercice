import * as functions from "firebase-functions";
import { dbService } from "../services/db.service";

export const stats = functions.https.onRequest(async (request, response) => {
  const stat = await dbService.getStats();
  response.status(200).send(stat);
});
