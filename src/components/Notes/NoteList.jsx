import React, { useState } from "react";
import { useSelector } from "react-redux";

import Note from "./Note";

const NoteList = ({ header, status }) => {
    const [show, setShow] = useState(true);

    let notes = useSelector((state) => state.notes);
    notes = Object.values(notes).filter((note) => note.status === status);
    let id;
    if (status === "confirmed") {
        const note = notes.find((note) => note.isCurrent);
        if (note) id = note.id;
    }

    return (
        <div className="ui segment">
            <div
                className={`ui header ${show ? "black" : "grey"}`}
                onClick={() => setShow((prev) => !prev)}
            >
                {header}
            </div>
            {notes.length > 0 && show && (
                <table className="ui celled compact table">
                    <tbody>
                        {notes.map((note) => {
                            if (note.id === id)
                                return <Note key={note.id} {...note} first />;
                            return <Note key={note.id} {...note} />;
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NoteList;
