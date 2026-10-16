import "./SpotSuccess.css";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function SpotSuccess({ show }) {
    if (!show) return null;

    return (
        <main className="page spot-success">
            <FiCheckCircle className="spot-success-icon" />
            <h1>Your reservation is confirmed</h1>
            <Link to="/trips" className="btn btn-dark">View your trips</Link>
        </main>
    );
}
