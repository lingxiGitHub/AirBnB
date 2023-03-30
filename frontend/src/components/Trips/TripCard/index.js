import "./TripCard.css";

function changeDateFormat(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short'
    });

    console.log("input date from server", inputDate)
    console.log("out put date", formattedDate)

    return formattedDate

}

export default function TripCard({ booking }) {


    return (
        <>

            <div className="one-card">

                <img className="indi-booking-img" src={booking.Spot.previewImage} alt=""></img>
                <div>
                    <div className="trip-spot-name">{booking.Spot.name}</div>
                    <div>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>

                    <div>{changeDateFormat(booking.startDate)} - {changeDateFormat(booking.endDate)}</div>


                </div>

            </div>
        </>

    )
}