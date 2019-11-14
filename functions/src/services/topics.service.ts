const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub();

export const publishResults = (dnaSequences: string[], result: boolean) => {
  const topic = pubsub.topic("save-mutant");
  const messageObject = {
    dnaSequences: dnaSequences,
    isMutant: result
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), "utf8");
  return topic.publish(messageBuffer);
};
