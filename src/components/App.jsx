import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CurrentList from "./Currents/CurrentList";
import Header from "./Header";
import NoteCreate from "./Create/NoteCreate";
import NoteList from "./Notes/NoteList";
import { fetchNotes } from "../reduxSlices/notesSlice";
import { fetchBooks } from "../reduxSlices/booksSlice";

const App = () => {
    const dispatch = useDispatch();
    const collection = useSelector((state) => state.collection);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchNotes(collection));
    }, [dispatch, collection]);

    return (
        <>
            <Header />
            <div className="ui grid four centered column">
                <div className="ten wide column">
                    <NoteCreate />
                    <NoteList header="Pending" status="pending" />
                    <NoteList header="Confirmed" status="confirmed" />
                </div>
                <div className="five wide column">
                    <CurrentList header="Current" />
                </div>
            </div>
        </>
    );
};

export default App;
