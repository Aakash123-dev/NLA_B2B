// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import projectSlice from './slices/projectSlice';
// import modelSlice from './slices/modelSlice';
// import insightsSlice from './slices/insightsSlice';
// import chartSlice from './slices/chartSlice';
// import uiSlice from './slices/uiSlice';
// import adminSlice from './slices/adminSlice';

// const rootReducer = combineReducers({
//   auth: authSlice,
//   user: userSlice,
//   project: projectSlice,
//   model: modelSlice,
//   insights: insightsSlice,
//   chart: chartSlice,
//   ui: uiSlice,
//   admin: adminSlice,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'user', 'ui'], // Only persist these reducers
//   blacklist: ['project', 'model', 'insights', 'chart', 'admin'], // Don't persist these
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed hooks for use throughout the app
// export { useAppDispatch, useAppSelector } from './hooks';

'use client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import projectSlice from './slices/projectSlice';
import chartslice from './slices/chartsSlices';

// import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import modelSlice from './slices/modelSlice';
// import insightsSlice from './slices/insightsSlice';
// import chartSlice from './slices/chartSlice';
// import uiSlice from './slices/uiSlice';
// import adminSlice from './slices/adminSlice';

const rootReducer = combineReducers({
  //   auth: authSlice,
  //   user: userSlice,
  //   model: modelSlice,
  //   insights: insightsSlice,
  //   chart: chartSlice,
  //   ui: uiSlice,
  //   admin: adminSlice,
  projects: projectSlice,
  chart: chartslice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'ui'], // Only persist these reducers
  blacklist: ['project', 'model', 'insights', 'chart', 'admin'], // Don't persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export { useAppDispatch, useAppSelector } from './hooks';
