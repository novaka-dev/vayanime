import Redis from "ioredis";
import { ApiResponse } from "./types/anime";

const getRedisConnectionURL = (): string => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("[REDIS]: Redis Connection URL is must!");
};

export const redis = new Redis(getRedisConnectionURL(), {
  tls: {
    rejectUnauthorized: false, // biar gak error TLS
  },
});

export async function storeOrGetFromRedis<T>(
  key: string,
  fetch: () => Promise<ApiResponse<T>>,
  ttl = 3600,
): Promise<ApiResponse<T>> {
  if (!key) {
    throw new Error("[Key] is required!");
  }

  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log("[Redis]: Cached from redis DB");
      return JSON.parse(cachedData) as ApiResponse<T>;
    }

    console.log("[API]: Fetched from API!");
    const response = await fetch();

    const serializableResponse = JSON.parse(JSON.stringify(response));
    await redis.set(key, JSON.stringify(serializableResponse), "EX", ttl);

    console.log("[API]: Stored on Redis!");
    return serializableResponse;
  } catch (error) {
    console.error("[Redis Error]:", error);
    const response = await fetch();
    return JSON.parse(JSON.stringify(response));
  }
}
