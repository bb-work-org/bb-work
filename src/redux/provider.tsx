"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { persist, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persist} loading={null}>
				{children}
			</PersistGate>
		</Provider>
	);
};
