import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";

import NoteField from "./NoteField";
import Heart from "../Heart";
import NoteCreateButton from "./NoteCreateButton";
import { createNote } from "../../reduxSlices/notesSlice";

const renderInput = ({ input, meta, placeholder, onBlur }) => {
    const validate = (e) => {
        onBlur(e);
        input.onBlur(e);
    };

    const renderError = () => {
        if (meta.error === "Duplicated")
            return <div className="ui label red">{meta.error}</div>;
        else if (meta.error === "Required" && meta.touched)
            return <div className="ui label red">{meta.error}</div>;
    };

    const errorStyle = () => {
        if (meta.error === "Duplicated") return { borderColor: "red" };
        else if (meta.error === "Required" && meta.touched)
            return { borderColor: "red" };
    };

    return (
        <>
            {renderError()}
            <input
                {...input}
                placeholder={placeholder}
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                onBlur={validate}
                style={errorStyle()}
            />
        </>
    );
};

const NoteCreate = () => {
    const [status, setStatus] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const notes = Object.values(useSelector((state) => state.notes));
    const collection = useSelector((state) => state.collection);
    const dispatch = useDispatch();

    const onFormSubmit = async (formValues, form) => {
        const note = { ...formValues, status, isFavorite };
        await dispatch(createNote({ note, collection }));
        setIsFavorite(false);
        form.restart();
    };

    const validate = (value) => {
        if (!value) return "Required";
        const found = notes.find((note) => note.content === value);
        if (found) return "Duplicated";
    };

    return (
        <div
            className="ui segment"
            style={{
                position: "fixed",
                zIndex: "2",
                bottom: "0",
                width: "949.5px",
            }}
        >
            <Form
                onSubmit={onFormSubmit}
                mutators={{
                    trimValue: ([field, _], state, { changeValue }) => {
                        changeValue(state, field, (prev) => prev.trim());
                    },
                }}
            >
                {({ handleSubmit, form }) => (
                    <form className="ui form" onSubmit={handleSubmit}>
                        <NoteCreateButton
                            onClick={() => form.reset()}
                            text="Clear"
                            color="red"
                        />
                        <NoteCreateButton
                            onClick={() => setStatus("pending")}
                            text="Future"
                            color="primary"
                        />
                        <NoteCreateButton
                            onClick={() => setStatus("confirmed")}
                            text="Confirm"
                            color="primary"
                        />
                        <div className="fields">
                            <Heart
                                onClick={() => setIsFavorite((prev) => !prev)}
                                isFavorite={isFavorite}
                                style={{ paddingTop: "0.35rem" }}
                            />
                            <NoteField>
                                <Field
                                    name="content"
                                    component={renderInput}
                                    placeholder="Author"
                                    onBlur={(e) => {
                                        if (e.target.value)
                                            form.mutators.trimValue("content");
                                    }}
                                    validate={validate}
                                />
                            </NoteField>
                            <NoteField>
                                <Field
                                    name="comment"
                                    component={renderInput}
                                    placeholder="Comment"
                                    onBlur={(e) => {
                                        if (e.target.value)
                                            form.mutators.trimValue("comment");
                                    }}
                                />
                            </NoteField>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    );
};

export default NoteCreate;
