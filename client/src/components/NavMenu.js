import React from 'react';

// TO DO: links => router links
// links types (classes): active, disabled, (none)
const NavMenu = () => {
    return (
        <ul class="nav justify-content-center grey lighten-4 py-2 mb-4">
            <li class="nav-item">
                <a class="nav-link" href="#!">
                    Route 1
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#!">
                    Route 2
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#!">
                    Route 3
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#!">
                    Route 4
                </a>
            </li>
        </ul>
    );
};

export default NavMenu;
