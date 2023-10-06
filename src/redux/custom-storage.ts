"use client";

import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    async getItem(_key: unknown) {
      return null;
    },
    async setItem(_key: unknown, value: unknown) {
      return await Promise.resolve(value);
    },
    async removeItem(_key: unknown) {
      await Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
