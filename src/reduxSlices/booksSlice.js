import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import server from "../apis/server";

const booksSlice = createSlice({
    name: "books",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                action.payload.forEach((book) => {
                    state[book] = book;
                });
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state[action.payload] = action.payload;
            })
            .addCase(removeBook.fulfilled, (state, action) => {
                delete state[action.payload];
            });
    },
});

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const { data } = await server.get("/books");
    return data;
});

export const createBook = createAsyncThunk("books/createBook", async (name) => {
    await server.post("/books", { name });
    return name;
});

export const removeBook = createAsyncThunk("books/removeBook", async (name) => {
    await server.delete(`/books/${name}`);
    return name;
});

export const useBooks = () =>
    Object.values(useSelector((state) => state.books)).sort();

export default booksSlice.reducer;
