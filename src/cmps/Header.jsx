import { NavLink, withRouter } from "react-router-dom";
import React from "react";
import { connect } from 'react-redux'


export function _Header(props) {

    return (
        <div className="main-header flex sb align-center">
            <div className="left-nav">
                <NavLink className="link" to="/main">Main-Page</NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/user">Dashboard</NavLink>
            </div>
            <input type="checkbox" className="custom-checkbox" onClick={()=>props.toggleDarkMode()}/>
        </div>
    )
}

export const Header = connect()(withRouter(_Header))