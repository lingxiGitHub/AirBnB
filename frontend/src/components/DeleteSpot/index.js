import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk, getAllSpots } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";

export default function DeleteSpot({ singleSpot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteSpotThunk(+singleSpot.id))
            .then(() => dispatch(getAllSpots()))
            .then(() => {
                closeModal();
                history.push("/");
            });
    };

    return (
        <ModalShell
            title="Delete listing"
            width="420px"
            footer={
                <>
                    <button className="btn-link" onClick={closeModal}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleDelete}>Yes, delete</button>
                </>
            }
        >
            <p className="body-text">
                Permanently delete <strong>{singleSpot.name}</strong>? Its photos, reviews and bookings will
                be removed too. This can't be undone.
            </p>
        </ModalShell>
    );
}
