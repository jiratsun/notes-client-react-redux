import React from "react";

const Heart = ({ onClick, isFavorite, style }) => {
    const heart = isFavorite ? "" : "outline";
    return (
        <i
            className={`big heart ${heart} icon`}
            onClick={onClick}
            style={style}
        />
    );
};

export default Heart;
