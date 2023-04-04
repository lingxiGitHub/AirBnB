import "./NotFound.css";
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (

        <>
            {/* <hr className="not-found-line"></hr> */}
            <div className="not-found-container">

                <div className="not-found-left">
                    <h1>We can’t seem to find the page you’re looking for</h1>

                    <NavLink 
                    className="not-found-nav"
                    exact to="/">Navigate back to Home Page</NavLink>
                </div>
                <img
                    className="not-found-right"
                    src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"></img>

            </div>
        </>


    )
}