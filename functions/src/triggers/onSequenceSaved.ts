import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
export const onSequenceSaved = functions.firestore
  .document("dna/{dnaDocument}")
  .onCreate(async (snapshot, context) => {
    const dna: any = snapshot.data();
    const documentRef = await db.doc("stats/mutants");
    // run the transaction
    await db.runTransaction(t => {
      return t.get(documentRef).then(doc => {
        const stats: any = doc.data();
        if (dna.isMutant) {
          stats.count_mutant_dna++;
          stats.ratio = stats.count_mutant_dna / stats.count_human_dna;
        } else {
          stats.count_human_dna++;
          stats.ratio = stats.count_mutant_dna / stats.count_human_dna;
        }
        t.update(documentRef, stats);
      });
    });
  });
