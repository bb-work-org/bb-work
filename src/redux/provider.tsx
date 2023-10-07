"use client";

import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from "@/redux/store";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};
