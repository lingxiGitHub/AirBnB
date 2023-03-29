import "./EditBooking.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookingThunk } from "../../store/booking"
import { useModal } from "../../context/Modal";

function convertDateStr(inputStr) {
    let dateObj = new Date(inputStr);
    let isoStr = dateObj.toISOString();
    let year = isoStr.slice(0, 4);
    let month = isoStr.slice(5, 7);
    let day = isoStr.slice(8, 10);
    let outputStr = `${year}-${month}-${day}`;
    return outputStr
}

export default function EditBooking({ booking }) {

    // console.log("--->", booking.startDate)
    const dispatch = useDispatch()

    const [startDate, setStateDate] = useState(convertDateStr(booking.startDate));
    const [endDate, setEndDate] = useState(convertDateStr(booking.endDate));
    const [warning, setWarning] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // useEffect(() => {
    //     if (endDate < startDate) {
    //         setWarning(true);
    //     } else {
    //         setWarning(false);
    //     }
    // }, [startDate, endDate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);
        const updatedBooking = {
            startDate,
            endDate
        }

        // console.log("--->", updatedBooking)

        dispatch(updateBookingThunk(updatedBooking, +booking.id))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    return (

        <form
            className="update-booking-form"
            onSubmit={handleUpdate}
        >

            <ul className="red-errors">
                {
                    // console.log(errors)
                    Object.values(errors).map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))
                }
            </ul>

            <label><span>Start Date</span>
                <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStateDate(e.target.value)}
                /></label>

            <label><span>End Date</span>
                <input
                    type="date"
                    value={endDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                /></label>

            {/* {warning && <p style={{ color: "red" }}>End date must be later than start date</p>} */}

            <button
                type="submit"
            >Submit</button>

        </form>
    )


}