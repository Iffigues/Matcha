import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import './../../Assets/css/default.min.css';

class Header extends Component{
    render() {
        return(
            <header>
                <div className="logo">
                    <img scr="./../../../public/logo.png"></img>
                </div>
                    <nav className="navbar">
                        <ul>
                            <li>
                                <Link to="/Homepage">Home</Link>
                            </li>
                            <li>
                                <Link to="/Products">Products</Link>
                            </li>
                            <li>
                                <Link to="/Contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
            </header>
        );
    }
}

export default Header;
