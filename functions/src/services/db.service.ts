import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

const getStats = async () => {
  const document = await db.doc("stats/mutants").get();
  return document.data();
};

const save = (dnaSequence: string[], isMutant: boolean) => {
  return db.collection("dna").add({
    sequence: dnaSequence,
    isMutant: isMutant
  });
};

export const dbService = {
  save,
  getStats
};
