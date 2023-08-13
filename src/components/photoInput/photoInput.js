import React from "react";
import './photoInput.css'

const PhotoInput = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'Paste the url of a photo and the Brain will detect faces!'}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input onChange={onInputChange} className="f4 pa2 br3 bw0 w-70 center" type="text"></input>
                    <button onClick={onButtonSubmit} className="w-30 grow br3 bw0 f3 link ph3 pv2 black bg-moon-gray">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default PhotoInput;