import React, { Component } from 'react';

interface NavBarProps {
    account: string | null;
}

class NavBar extends Component<NavBarProps> {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" id="navbar-title" href="#" rel="noopener noreferrer">VantaGreen</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <p className="text-white" id="account">{this.props.account}</p>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
