import { constants } from "../utils/constants";
import { transformSequence } from "../utils/dna";

const expression = `${constants.BASE1}|${constants.BASE2}|${constants.BASE3}|${constants.BASE4}`;
const re = new RegExp(expression);

export const isMutant = (dnaSequences: string[]) => {
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
