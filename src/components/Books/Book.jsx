import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";

import ConfirmDeleteButton from "../ConfirmDeleteButton";
import { setCollection } from "../../reduxSlices/collectionSlice";
import { removeBook } from "../../reduxSlices/booksSlice";

const Book = ({ book }) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const onItemMouseEnter = () => {
        setHover(setTimeout(() => setShowDelete(true), 2000));
    };

    const onItemMouseLeave = () => {
        clearTimeout(hover);
        setShowDelete(false);
    };

    const onConfirm = (e) => {
        e.stopPropagation();
        dispatch(removeBook(book));
    };

    return (
        <div
            onClick={() => dispatch(setCollection(book))}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
            className="item"
        >
            {showDelete ? (
                <div
                    className="right floated content"
                    style={{
                        height: "27px",
                        width: "38.5px",
                    }}
                >
                    <ConfirmDeleteButton onConfirm={onConfirm} size="" />
                </div>
            ) : (
                <div
                    className="right floated content"
                    style={{
                        height: "27px",
                        width: "30px",
                    }}
                >
                    <i className="trash alternate small icon" />
                </div>
            )}
            <i className="folder icon" />
            <div className="content">
                <div className="header">{book}</div>
            </div>
        </div>
    );
};

export default Book;
