export const transformSequence = (dnaSequences: string[]) => {
  const sequenceSize = dnaSequences.length;
  const dnaTransformSequences = [];

  for (let i = 0; i < sequenceSize; i++) {
    let newDnaSequence = "";
    for (let j = 0; j < dnaSequences.length; j++) {
      const dnaSequence = dnaSequences[j];
      const character = dnaSequence[i];
      newDnaSequence = newDnaSequence + character;
    }
    dnaTransformSequences.push(newDnaSequence);
  }
  return dnaTransformSequences;
};
