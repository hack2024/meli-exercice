import { constants } from "../utils/constants";
import { dbService } from "./db.service";
import { transformSequence } from "../utils/dna";

const expression = `${constants.BASE1}|${constants.BASE2}|${constants.BASE3}|${constants.BASE4}`;
const re = new RegExp(expression);

export const isMutant = async (dnaSequences: string[]) => {
  let countSequenses = 0;
  let mutant = false;
  // validate row
  countSequenses = countSequenses + countRowSequence(dnaSequences);
  // validate column
  countSequenses = countSequenses + countColumnSequence(dnaSequences);
  // validate diagonal
  countSequenses = countSequenses + countDiagonalSequence(dnaSequences);

  if (countSequenses > 1) {
    mutant = true;
  }

  await dbService.saveDnaToDB(dnaSequences, mutant);

  return mutant;
};

const countRowSequence = (dna: string[]) => {
  let count = 0;
  for (const seq of dna) {
    if (re.test(seq)) count++;
  }
  return count;
};

const countColumnSequence = (dna: string[]) => {
  const sequenceSize = dna.length;
  const dnaTraspuesta = [];

  for (let i = 0; i < sequenceSize; i++) {
    let newDnaSequence = "";
    for (let j = 0; j < dna.length; j++) {
      const dnaSequence = dna[j];
      const character = dnaSequence[i];
      newDnaSequence = newDnaSequence + character;
    }
    dnaTraspuesta.push(newDnaSequence);
  }

  return countRowSequence(dnaTraspuesta);
};

const countDiagonalSequence = (dna: string[]) => {
  let sequenceSize = dna.length - 1;
  const dnaDiagonal = [];
  let sequenceDiagonalA = "";
  let sequenceDiagonalB = "";

  for (let i = 0; i < dna.length; i++) {
    const dnaSequence = dna[i];
    const characterDiagonalA = dnaSequence[i];
    const characterDiagonalB = dnaSequence[sequenceSize];
    sequenceSize--;
    sequenceDiagonalA = sequenceDiagonalA + characterDiagonalA;
    sequenceDiagonalB = sequenceDiagonalB + characterDiagonalB;
  }

  dnaDiagonal.push(sequenceDiagonalA);
  dnaDiagonal.push(sequenceDiagonalB);

  return countRowSequence(dnaDiagonal);
};

const isMutantV2 = (dnaSequences: string[]) => {
  return validateDNA(dnaSequences);
};

const validateDNA = (dnaSequences: string[]) => {
  let sequenceSize = dnaSequences.length - 1;
  let sequenceDiagonalA = "";
  let sequenceDiagonalB = "";
  let count = 0;

  for (let i = 0; i < dnaSequences.length; i++) {
    const dnaSequence = dnaSequences[i];
    //validamos por fila el string
    if (re.test(dnaSequence)) count++;
    if (count > 1) return true;

    const characterDiagonalA = dnaSequence[i];
    const characterDiagonalB = dnaSequence[sequenceSize];
    sequenceDiagonalA = sequenceDiagonalA + characterDiagonalA;
    sequenceDiagonalB = sequenceDiagonalB + characterDiagonalB;
    sequenceSize--;
  }
  //validamos las sequencias encontradas en las diagonales
  if (re.test(sequenceDiagonalA)) count++;
  if (re.test(sequenceDiagonalA)) count++;
  if (count > 1) return true;

  // ahora obtenemos intercambiamos filas por columnas
  const dnaSequencesTransform = transformSequence(dnaSequences);
  for (const seq of dnaSequencesTransform) {
    //validamos por fila el string
    if (re.test(seq)) count++;
    if (count > 1) return true;
  }

  return false;
};
