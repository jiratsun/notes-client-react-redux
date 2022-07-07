import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { editNote } from "../../reduxSlices/notesSlice";

const NoteButton = ({ id, status, setIsEditing }) => {
    const collection = useSelector((state) => state.collection);
    const dispatch = useDispatch();

    const onExchangeClick = () => {
        if (status === "pending")
            dispatch(
                editNote({ id, note: { status: "confirmed" }, collection })
            );
        else
            dispatch(editNote({ id, note: { status: "pending" }, collection }));
    };

    const onPlayClick = () => {
        dispatch(editNote({ id, note: { isCurrent: true }, collection }));
    };

    return (
        <>
            <button
                onClick={() => setIsEditing(true)}
                className="ui mini icon button"
            >
                <i className="edit icon" />
            </button>
            <button
                onClick={onExchangeClick}
                className="ui mini icon button blue"
            >
                <i className="exchange icon" />
            </button>
            <button onClick={onPlayClick} className="ui mini icon button green">
                <i className="play icon" />
            </button>
        </>
    );
};

export default NoteButton;
