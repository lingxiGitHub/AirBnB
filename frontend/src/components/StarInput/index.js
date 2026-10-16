import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarInput.css";

// Clickable 1–5 star picker used by the review forms
export default function StarInput({ value, onChange }) {
    const [hover, setHover] = useState(0);
    const shown = hover || Math.round(Number(value) || 0);

    return (
        <div className="star-input" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    type="button"
                    key={n}
                    role="radio"
                    aria-checked={Math.round(Number(value)) === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className={"star-input-star" + (n <= shown ? " on" : "")}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => onChange(n)}
                >
                    <FaStar />
                </button>
            ))}
        </div>
    );
}
