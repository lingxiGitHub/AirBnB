import { deleteSpotThunk } from "../../store/spots"

export default function DeleteSpot({ singleSpot, sessionUser, dispatch, spotId, history, setShowDeleteEdit }) {

    let sessionLinks;



    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(+spotId))
            .then(() => history.push("/"))
        setShowDeleteEdit(false)
    }

    if (sessionUser) {

        const currentUserId = sessionUser.id
        const spotOwnerId = singleSpot.ownerId

        if (currentUserId === spotOwnerId) {
            sessionLinks = (

                <div>
                    <button
                        onClick={handleDelete}
                    >Confirm Delete</button>
                </div>
            )


        } else if (currentUserId !== spotOwnerId) {
            sessionLinks = (
                <p>You are not the owner</p>
            )
        }

    }
    return (
        <>

            {sessionUser && (
                sessionLinks

            )}

            {!sessionUser && (
                <div>Please log in to delete the spot</div>
            )}
        </>
    )

}