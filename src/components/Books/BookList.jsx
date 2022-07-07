import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import Book from "./Book";
import { useBooks } from "../../reduxSlices/booksSlice";

const BookList = ({ setDropdown }) => {
    const books = useBooks();
    const collection = useSelector((state) => state.collection);

    return ReactDOM.createPortal(
        <div
            onClick={() => setDropdown(false)}
            className="ui dimmer modals visible active"
        >
            <div
                className="ui standard modal visible active"
                style={{ width: "40rem" }}
            >
                <div className="ui segment">
                    {books.length > 0 && (
                        <div className="ui list selection divided massive">
                            {books.map((book) => {
                                if (book === collection) return null;
                                return <Book key={book} book={book} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default BookList;
