import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookList from "./Books/BookList";
import { createBook, useBooks } from "../reduxSlices/booksSlice";
import { setCollection } from "../reduxSlices/collectionSlice";

const renderTime = (latestNote) => {
    if (latestNote)
        return `Last Modified: ${new Date(
            latestNote.datetime
        ).toLocaleString()}`;
    return "";
};

const Header = () => {
    const [collectionInput, setCollectionInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const collection = useSelector((state) => state.collection);
    const notes = Object.values(useSelector((state) => state.notes));
    const books = useBooks();
    const dispatch = useDispatch();

    const create = (name) => {
        if (name === collection || name === "")
            return () => setCollectionInput("");
        const found = books.find((book) => book === name);
        if (found)
            return () => {
                dispatch(setCollection(name));
                setCollectionInput("");
            };
        return () => {
            dispatch(createBook(name));
            setCollectionInput("");
        };
    };

    return (
        <div className="ui menu top fixed">
            <div
                className="header item dropdown"
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                {collection}
            </div>
            {showDropdown && <BookList setDropdown={setShowDropdown} />}
            <div className="item">
                <div className="ui action input">
                    <input
                        value={collectionInput}
                        onChange={(e) => setCollectionInput(e.target.value)}
                        placeholder="Book"
                    />
                    <button
                        onClick={create(collectionInput)}
                        className="ui icon button"
                    >
                        <i className="plus icon" />
                    </button>
                </div>
            </div>
            <div className="right menu">
                <div className="item">Total Notes: {notes.length}</div>
                <div className="item">{renderTime(notes[0])}</div>
                <div className="item">
                    <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="ui icon button circular"
                    >
                        <i className="arrow up icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
