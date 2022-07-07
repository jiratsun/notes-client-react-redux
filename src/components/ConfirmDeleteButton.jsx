import React, { useState } from "react";

const ConfirmDeleteButton = ({ onConfirm, size }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const showConfirm = (e) => {
        e.stopPropagation();
        setConfirmDelete(true);
        setTimeout(() => {
            setConfirmDelete(false);
        }, 1500);
    };
    return (
        <>
            {confirmDelete ? (
                <button
                    onClick={onConfirm}
                    className={`ui ${size} icon button red`}
                >
                    <i className="check icon" />
                </button>
            ) : (
                <button
                    onClick={showConfirm}
                    className={`ui ${size} icon button red`}
                >
                    <i className="trash alternate icon" />
                </button>
            )}
        </>
    );
};

export default ConfirmDeleteButton;
