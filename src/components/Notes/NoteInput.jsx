import React from "react";

const NoteInput = ({ value, setValue }) => {
    return (
        <div className="ui input fluid">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                autoComplete="off"
            />
        </div>
    );
};

export default NoteInput;
