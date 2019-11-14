export const validateRequest = (request: any) => {
  if (
    request.method !== "POST" &&
    request.headers["content-type"] !== "application/json"
  ) {
    return false;
  }
  return true;
};

export const validateDnaSequences = (dnaSequence: string[]) => {
  let isValid = false;
  try {
    if (dnaSequence.length > 0) {
      isValid = validateSequence(dnaSequence);
    }
  } catch {}

  return isValid;
};

const validateSequence = (dnaSequence: string[]) => {
  const sequenceSize = dnaSequence.length;
  for (const seq of dnaSequence) {
    if (typeof seq !== "string" || seq.length !== sequenceSize) {
      return false;
    }
  }
  return true;
};
