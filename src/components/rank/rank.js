import React from "react";

const Rank = ({name, entries}) => {
    return (
        <div className="f3">
            <p>Hi {name}, your current rank is</p>
            <h3>#{entries}</h3>
        </div>
    )
}

export default Rank;