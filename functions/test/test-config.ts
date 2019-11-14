import * as TestFunctions from "firebase-functions-test";

const firebaseConfig = {
  databaseURL: "https://meli-exercice.firebaseio.com",
  projectId: "meli-exercice"
};

const envConfig = {
  algolia: { app: "M6VTDV2FC0", key: "bcbb7cb170350c0eb2b1a7c0e2b1027b" }
};

const fun = TestFunctions(firebaseConfig, "service-account.json");

fun.mockConfig(envConfig);

export { fun };
