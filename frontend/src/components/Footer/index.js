import { FiGithub, FiGlobe } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="page footer-inner">
                <div className="footer-left">
                    <span>© {new Date().getFullYear()} AirClone</span>
                    <span className="footer-dot">·</span>
                    <span>An Airbnb clone built with React, Redux & Express</span>
                </div>
                <div className="footer-right">
                    <span className="footer-item"><FiGlobe /> English (US)</span>
                    <span className="footer-item">$ USD</span>
                    <a
                        className="footer-item"
                        href="https://github.com/lingxiGitHub/AirBnB"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub /> GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
