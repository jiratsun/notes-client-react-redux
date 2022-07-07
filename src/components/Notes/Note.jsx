import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Heart from "../Heart";
import NoteEditButton from "./NoteEditButton";
import NoteButton from "./NoteButton";
import NoteDeleteButton from "./NoteDeleteButton";
import NoteInput from "./NoteInput";
import { editNote } from "../../reduxSlices/notesSlice";

const Note = ({
    content,
    comment,
    status,
    isFavorite,
    isCurrent,
    id,
    datetime,
    first,
}) => {
    const dispatch = useDispatch();
    const collection = useSelector((state) => state.collection);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [updatedComment, setUpdatedComment] = useState(comment);

    const onHeartClick = () => {
        dispatch(
            editNote({ id, note: { isFavorite: !isFavorite }, collection })
        );
    };

    return (
        <tr
            className={`${
                isCurrent && (status === "pending" ? "warning" : "positive")
            } ${first ? "negative" : ""}`}
            title={new Date(datetime).toLocaleString()}
        >
            <td className="collapsing">
                <Heart isFavorite={isFavorite} onClick={onHeartClick} />
            </td>
            <td>
                {isEditing ? (
                    <NoteInput
                        value={updatedContent}
                        setValue={setUpdatedContent}
                    />
                ) : (
                    content
                )}
            </td>
            <td>
                {isEditing ? (
                    <NoteInput
                        value={updatedComment}
                        setValue={setUpdatedComment}
                    />
                ) : (
                    comment
                )}
            </td>
            <td className="collapsing">
                {isEditing ? (
                    <NoteEditButton
                        content={content}
                        comment={comment}
                        updatedContent={updatedContent}
                        setUpdatedContent={setUpdatedContent}
                        updatedComment={updatedComment}
                        setUpdatedComment={setUpdatedComment}
                        setIsEditing={setIsEditing}
                        id={id}
                    />
                ) : (
                    <>
                        <NoteButton
                            id={id}
                            status={status}
                            setIsEditing={setIsEditing}
                        />
                        <NoteDeleteButton id={id} />
                    </>
                )}
            </td>
        </tr>
    );
};

export default Note;
