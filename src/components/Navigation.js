import pomdructiveLogo from '../assets/img/pomdructive-logo.png';

function Navigation() { 
    return (
        <nav className="nav">
            <div className="nav-item">
                <img src={pomdructiveLogo} className="nav-logo" />
                <h2 className="nav-text">Pomdructive</h2>
            </div>
        </nav>
    );
}

export default Navigation;