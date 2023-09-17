import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "@/redux/features/auth-slice";
import { userApi } from "@/redux/services/user-api";
import storage from "@/redux/custom-storage";
import { settingsReducer } from "@/redux/features/settings-slice";
import { courseApi } from "@/redux/services/course-api";
import { activityApi } from "@/redux/services/activity-api";

export const rootReducers = combineReducers({
	auth: authReducer,
	settings: settingsReducer,
	[userApi.reducerPath]: userApi.reducer,
	[courseApi.reducerPath]: courseApi.reducer,
	[activityApi.reducerPath]: activityApi.reducer
});

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["auth", "settings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([
			userApi.middleware,
			courseApi.middleware,
			activityApi.middleware
		]),
});

setupListeners(store.dispatch);

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
