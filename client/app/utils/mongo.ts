
import { MongoClient } from "mongodb";

const initializeClient = async (): Promise<MongoClient> => {
  try {
    return MongoClient.connect(process.env.MONGODB_URI as string);
  } catch (e) {
    throw e;
  }
};

export const dbClientPromise = initializeClient();