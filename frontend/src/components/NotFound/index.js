import "./NotFound.css";
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className="page not-found">
            <div className="not-found-text">
                <h1>Oops!</h1>
                <h2>We can't seem to find the page you're looking for.</h2>
                <p className="muted">Error code: 404</p>
                <Link className="btn btn-dark" to="/">Go to homepage</Link>
            </div>
            <img
                className="not-found-img"
                src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"
                alt=""
            />
        </main>
    );
}
