import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
    setUserLoginDetails,
    setSignOutState,
    selectUserName,
    selectUserEmail,
    selectUserPhoto,
    userReducer
} from './slices/userSlice';

import {
    setMovies,
    selectRecommend,
    selectNewDisney,
    selectOriginal,
    selectTrending,
    movieReducer
} from './slices/movieSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export {
    store,
    setUserLoginDetails,
    setSignOutState,
    selectUserName,
    selectUserEmail,
    selectUserPhoto,
    setMovies,
    selectRecommend,
    selectNewDisney,
    selectOriginal,
    selectTrending,
};