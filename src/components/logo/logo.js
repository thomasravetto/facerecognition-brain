import React from "react";
import Tilt from 'react-parallax-tilt';
import './logo.css'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt style={{width: '150px'}}>
                <div className="tilt br2 shadow-2" style={{ height: '150px', width: '150px', backgroundColor: '' }}>
                    <h1 className="pa3"><img style={{paddingTop:'5px', width:'100px'}} alt="logo" src={brain}></img></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;