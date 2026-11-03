import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <h1>Employee Polls</h1>
            <p>Welcome to Employee Polls!</p>
            <p>Log in to view and participate in polls.</p>

            <Link to="/login">
                <button>Log In</button>
            </Link>
        </div>
    );
}

export default LandingPage;