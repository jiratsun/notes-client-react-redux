import { createSlice } from "@reduxjs/toolkit";

import { createBook } from "./booksSlice";

const collectionSlice = createSlice({
    name: "collection",
    initialState: "Notes",
    reducers: {
        setCollection: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBook.fulfilled, (_, action) => {
            return action.payload;
        });
    },
});

export const { setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
