import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import { MenuData } from "./MenuData";

import "./Navbar.css";

function Navbar() {
    return (
        <>
        <nav className="NavbarItems">
        
            <h1 className="logo_1">
                <Link style={{color: 'white'}} to="/"><img src="https://media.discordapp.net/attachments/1029748840015863830/1052562377893232800/Hamapiens.png"/></Link>
            </h1>

            <ul className="nav-menu">
            {MenuData.map((item, index)=>
                   <li key={index}>
                    <Link style={{color: 'black'}} to={item.url} className={item.cName}>{item.title}</Link>
                   </li>
            )}
        </ul>
        </nav>
        </>
    );
};

export default Navbar;