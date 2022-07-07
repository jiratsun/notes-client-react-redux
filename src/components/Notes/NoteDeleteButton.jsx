import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ConfirmDeleteButton from "../ConfirmDeleteButton";
import { removeNote } from "../../reduxSlices/notesSlice";

const NoteDeleteButton = ({ id }) => {
    const collection = useSelector((state) => state.collection);
    const dispatch = useDispatch();

    const onConfirm = () => {
        dispatch(removeNote({ id, collection }));
    };

    return <ConfirmDeleteButton onConfirm={onConfirm} size="mini" />;
};

export default NoteDeleteButton;
