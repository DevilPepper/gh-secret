import * as Middlewares from './Middlewares';
export * from './Yarguments';

export const middlewares = [
  Middlewares.normalizeSecretsPath,
  Middlewares.askForPassphrase,
  Middlewares.authenticate,
];
