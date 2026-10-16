import "./EditBooking.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBookingThunk } from "../../store/booking";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";

// Bookings are stored as local midnight, so read them back in local time
function convertDateStr(inputStr) {
    const d = new Date(inputStr);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const gmtStr = ` GMT${new Date("2030-01-02").toString().split("GMT")[1]}`;

export default function EditBooking({ booking }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(convertDateStr(booking.startDate));
    const [endDate, setEndDate] = useState(convertDateStr(booking.endDate));
    const [errors, setErrors] = useState([]);
    const today = new Date().toISOString().split("T")[0];

    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(updateBookingThunk({ startDate: startDate + gmtStr, endDate: endDate + gmtStr }, +booking.id))
            .then(closeModal)
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Change dates" width="480px">
            <form onSubmit={handleUpdate}>
                <div className="edit-booking-spot">
                    <img src={booking.Spot.previewImage} alt="" />
                    <div>
                        <div className="edit-booking-name">{booking.Spot.name}</div>
                        <div className="muted">{booking.Spot.city}, {booking.Spot.state}</div>
                    </div>
                </div>

                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}

                <div className="field-group">
                    <div className="field-row">
                        <label className="field">
                            <span className="field-label">Check-in</span>
                            <input
                                type="date"
                                value={startDate}
                                min={today}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </label>
                        <label className="field">
                            <span className="field-label">Checkout</span>
                            <input
                                type="date"
                                value={endDate}
                                min={startDate || today}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>

                <button className="btn btn-primary btn-block edit-booking-submit" type="submit">Save dates</button>
            </form>
        </ModalShell>
    );
}
