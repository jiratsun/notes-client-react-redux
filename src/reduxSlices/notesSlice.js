import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createBook } from "./booksSlice";
import server from "../apis/server";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action) => {
                action.payload.forEach((note) => {
                    state[note.id] = note;
                });
            })
            .addCase(createNote.fulfilled, (state, action) => {
                return { [action.payload.id]: action.payload, ...state };
            })
            .addCase(editNote.fulfilled, (state, action) => {
                state[action.payload.id] = action.payload;
            })
            .addCase(removeNote.fulfilled, (state, action) => {
                delete state[action.payload];
            })
            .addCase(createBook.fulfilled, () => ({}))
            .addCase("collection/setCollection", () => ({}));
    },
});

export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async (collection) => {
        const { data } = await server.get("/notes", { params: { collection } });
        return data;
    }
);

export const createNote = createAsyncThunk(
    "notes/createNote",
    async ({ note, collection }) => {
        const { data } = await server.post("/notes", note, {
            params: { collection },
        });
        return data;
    }
);

export const editNote = createAsyncThunk(
    "notes/editNote",
    async ({ id, note, collection }) => {
        const { data } = await server.patch(`/notes/${id}`, note, {
            params: { collection },
        });
        return data;
    }
);

export const removeNote = createAsyncThunk(
    "notes/removeNote",
    async ({ id, collection }) => {
        await server.delete(`/notes/${id}`, { params: { collection } });
        return id;
    }
);

export default notesSlice.reducer;
