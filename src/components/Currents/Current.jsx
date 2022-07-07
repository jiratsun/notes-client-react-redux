import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editNote } from "../../reduxSlices/notesSlice";

const Current = ({ content, status, id, datetime, currentComment }) => {
    const [comment, setComment] = useState(currentComment);
    const dispatch = useDispatch();
    const collection = useSelector((state) => state.collection);

    return (
        <tr
            className={status === "pending" ? "warning" : "positive"}
            title={`${new Date(datetime).toLocaleString()}`}
        >
            <td>{content}</td>
            <td style={{ width: "0" }}>
                <div className="ui input" style={{ width: "100px" }}>
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={() =>
                            dispatch(
                                editNote({
                                    id,
                                    note: { currentComment: comment },
                                    collection,
                                })
                            )
                        }
                    />
                </div>
            </td>
            <td className="collapsing">
                <button
                    onClick={() =>
                        dispatch(
                            editNote({
                                id,
                                note: { isCurrent: false, currentComment: "" },
                                collection,
                            })
                        )
                    }
                    className="ui mini icon button green"
                >
                    <i className="check icon" />
                </button>
            </td>
        </tr>
    );
};

export default Current;
