import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

const saveDnaToDB = async (dnaSequence: string[], isMutant: boolean) => {
  const documentRef = await db.doc("stats/mutants");
  // run the transaction
  await db.runTransaction(t => {
    return t.get(documentRef).then(doc => {
      const stats: any = doc.data();
      if (isMutant) {
        stats.count_mutant_dna++;
        stats.ratio = stats.count_mutant_dna / stats.count_human_dna;
      } else {
        stats.count_mutant_dna++;
        stats.ratio = stats.count_mutant_dna / stats.count_human_dna;
      }
      t.update(documentRef, stats);
    });
  });

  return db.collection("dna").add({
    sequence: dnaSequence,
    isMutant: isMutant
  });
};

const getStats = async () => {
  const document = await db.doc("stats/mutants").get();
  return document.data();
};

export const dbService = {
  saveDnaToDB,
  getStats
};
