import { Environment } from "../enums/environment.enum";

export function getEnvironmentExecution(): string {
  return process.env.NODE_ENV;
};

export function getEnvironmentFile(): string {
  switch (process.env.NODE_ENV) {
    case 'development':
      return './env/development.env'

    case 'production':
      return './env/production.env';

    case Environment.Test:
      return './env/test.env'

    case Environment.Local:
      return './env/local.env';

    default:
      throw new Error("Enum not found");
  };
};