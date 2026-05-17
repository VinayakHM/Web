export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {}
  }
  var BASE_URL: string;
}
