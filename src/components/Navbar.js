import React from 'react';

function Navbar(props) {
    return (
        <div class="dummy-nav z-depth-1">
            <div className="container nav-content">
                <div class="nav-title">React PE</div>
                <div class="nav-user">

                    <div class="user-info">
                        <svg width="80" height="14"><rect width="100%" height="100%"></rect></svg>
                        <svg width="45" height="14"><rect width="100%" height="100%"></rect></svg>
                    </div>

                    <div class="user-avatar">
                        <img src="img/avatar.jpg" alt="user-avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
