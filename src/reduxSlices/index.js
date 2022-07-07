import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./notesSlice";
import booksReducer from "./booksSlice";
import collectionReducer from "./collectionSlice";

export default configureStore({
    reducer: {
        notes: notesReducer,
        books: booksReducer,
        collection: collectionReducer,
    },
});
