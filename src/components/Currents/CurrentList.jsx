import React from "react";
import { useSelector } from "react-redux";

import Current from "./Current";

const CurrentList = ({ header }) => {
    let notes = useSelector((state) => state.notes);
    notes = Object.values(notes).filter((note) => note.isCurrent);

    return (
        <div
            className="ui segment"
            style={{
                position: "fixed",
                zIndex: "1",
                width: "460.75px",
                marginTop: "14px",
                height: "739.5px",
            }}
        >
            <div className="ui header">{header}</div>
            {notes.length > 0 && (
                <table className="ui celled compact table">
                    <tbody>
                        {notes.map((note) => (
                            <Current key={note.id} {...note} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CurrentList;
