import { pipeline } from "ts-pipe-compose";
import { z } from "zod";

const loadEnvs = (env: any) => ({
  appName: env.APP_NAME,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    appName: z.string().min(1),
  });

  try {
    schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
  return config;
};

export const createConfig = pipeline(loadEnvs, validateConfig);
