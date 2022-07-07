import React from "react";

const NoteCreateButton = ({ text, onClick, color }) => {
    return (
        <button
            onClick={onClick}
            className={`ui button ${color} right floated`}
        >
            {text}
        </button>
    );
};

export default NoteCreateButton;
