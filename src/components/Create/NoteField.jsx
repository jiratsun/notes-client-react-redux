import React from "react";

const NoteField = ({ children }) => {
    return (
        <div className="field" style={{ width: "20rem" }}>
            <div className="ui labeled input">{children}</div>
        </div>
    );
};

export default NoteField;
