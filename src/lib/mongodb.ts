import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'istd_thrissur';

interface GlobalMongo {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoConnection: GlobalMongo | undefined;
}

const cached: GlobalMongo = global._mongoConnection || { client: null, promise: null };
if (!global._mongoConnection) {
  global._mongoConnection = cached;
}

export function isMongoConfigured(): boolean {
  return Boolean(MONGODB_URI && MONGODB_URI.startsWith('mongodb'));
}

export async function getMongoDatabase(): Promise<Db | null> {
  if (!isMongoConfigured()) {
    return null;
  }

  try {
    if (cached.client) {
      return cached.client.db(MONGODB_DB);
    }

    if (!cached.promise) {
      cached.promise = MongoClient.connect(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      });
    }

    cached.client = await cached.promise;
    return cached.client.db(MONGODB_DB);
  } catch (err) {
    console.error('[MongoDB Connection Error]: Falling back to local JSON store.', err);
    cached.promise = null;
    cached.client = null;
    return null;
  }
}
