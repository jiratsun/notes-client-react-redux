import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { editNote } from "../../reduxSlices/notesSlice";

const NoteEditButton = ({
    content,
    comment,
    updatedContent,
    setUpdatedContent,
    updatedComment,
    setUpdatedComment,
    setIsEditing,
    id,
}) => {
    const collection = useSelector((state) => state.collection);
    const dispatch = useDispatch();

    const onEditClick = async () => {
        await dispatch(
            editNote({
                id,
                note: { content: updatedContent, comment: updatedComment },
                collection,
            })
        );
        setIsEditing(false);
    };

    return (
        <>
            <button onClick={onEditClick} className="ui mini icon button green">
                <i className="check icon" />
            </button>
            <button
                onClick={() => {
                    setUpdatedContent(content);
                    setUpdatedComment(comment);
                }}
                className="ui mini icon button blue"
            >
                <i className="undo alternate icon" />
            </button>
            <button
                onClick={() => {
                    setIsEditing(false);
                    setUpdatedContent(content);
                    setUpdatedComment(comment);
                }}
                className="ui mini icon button red"
            >
                <i className="delete icon" />
            </button>
        </>
    );
};

export default NoteEditButton;
