// src/core/config/env.ts

import * as dotenv from "dotenv";

dotenv.config();

/**
 * Función para obtener una variable de entorno obligatoria.
 * Lanza un error si la variable no está definida.
 */
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(
      `La variable de entorno requerida "${name}" no está definida.`
    );
  }
  return value;
}

/**
 * Función para obtener una variable de entorno opcional con un valor por defecto.
 */
function getEnvVarOptional(name: string, defaultValue: string = ""): string {
  return process.env[name] || defaultValue;
}

/**
 * Función para obtener una variable de entorno numérica opcional con un valor por defecto.
 */
function getEnvVarNumberOptional(
  name: string,
  defaultValue: number = 0
): number {
  const value = process.env[name];
  return value ? parseInt(value, 10) : defaultValue;
}

export const env = {
  //URL del frontend
  frontendUrl: getEnvVar("FRONT_URL"),

  jwtSecret: getEnvVarOptional("JWT_SECRET", "defaultsecret"),
  mongodbUri: getEnvVarOptional(
    "MONGO_UTLMONGO_URL",
    "mongodb://localhost:27017/authDB"
  ),
  port: getEnvVarNumberOptional("PORT", 3000),
  dbName: getEnvVarOptional("MONGO_DB_NAME", "default"),
  jwtAccessSecret: getEnvVar("JWT_ACCESS_SECRET"),
  jwtRefreshSecret: getEnvVar("JWT_REFRESH_SECRET"),
  googleClientId: getEnvVar("GOOGLE_CLIENT_ID"),
  googleClientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
  googleRedirectUri: getEnvVar("GOOGLE_REDIRECT_URI"),
  awsRegion: getEnvVar("AWS_REGION"),
  awsAccessKeyId: getEnvVar("AWS_ACCESS_KEY_ID"),
  awsSecretAccessKey: getEnvVar("AWS_SECRET_ACCESS_KEY"),
  awsBucketName: getEnvVar("AWS_BUCKET_NAME"),

  redisHost: getEnvVar("REDIS_HOST"),
  redisPort: getEnvVarNumberOptional("REDIS_PORT"),
  // redisPassword: getEnvVar("REDIS_PASSWORD"),

  // Variables de entorno obligatorias para el correo electrónico
  //   emailUser: getEnvVar("IONOS_EMAIL_USER"),
  //   emailPass: getEnvVar("IONOS_EMAIL_PASS"),
  //   emailHost: getEnvVarOptional("IONOS_SMTP_HOST", "smtp.ionos.com"),
  //   emailPort: getEnvVarNumberOptional("IONOS_SMTP_PORT", 587),

  // Variables de entorno opcionales adicionales
  //   emailInfoUser: getEnvVarOptional("IONOS_EMAIL_INFO"),
  //   emailInfoPass: getEnvVarOptional("IONOS_EMAIL_INFO_PASS"),
  //   emailInfoHost: getEnvVarOptional("IONOS_EMAIL_INFO_HOST"),
  //   emailInfoPort: getEnvVarNumberOptional("IONOS_EMAIL_INFO_PORT"),
};
