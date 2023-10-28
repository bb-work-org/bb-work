import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/redux/custom-storage";
import { authReducer } from "@/redux/features/auth-slice";
import { settingsReducer } from "@/redux/features/settings-slice";
import { themeReducer } from "@/redux/features/theme-slice";
import { activityApi } from "@/redux/services/activity-api";
import { bannerApi } from "@/redux/services/banner-api";
import { courseApi } from "@/redux/services/course-api";
import { courseContentApi } from "@/redux/services/course-content-api";
import { userApi } from "@/redux/services/user-api";
import { activitiesReducer } from "./features/activities-slice";

export const rootReducers = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  activities: activitiesReducer,
  theme: themeReducer,
  [userApi.reducerPath]: userApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [courseContentApi.reducerPath]: courseContentApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "settings", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      userApi.middleware,
      courseApi.middleware,
      courseContentApi.middleware,
      activityApi.middleware,
      bannerApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
