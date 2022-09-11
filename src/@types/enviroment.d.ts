declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      mongoose_uri: string;
    }
  }
}

export {};