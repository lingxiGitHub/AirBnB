import { csrfFetch } from "./csrf";

const LOAD_FAVORITES = "favorites/load";
const ADD_FAVORITE = "favorites/add";
const REMOVE_FAVORITE = "favorites/remove";
const CLEAR_FAVORITES = "favorites/clear";

const loadFavorites = (favorites) => ({ type: LOAD_FAVORITES, favorites });
const addFavorite = (spotId) => ({ type: ADD_FAVORITE, spotId });
const removeFavorite = (spotId) => ({ type: REMOVE_FAVORITE, spotId });
export const clearFavorites = () => ({ type: CLEAR_FAVORITES });

export const getFavorites = () => async dispatch => {
    const res = await csrfFetch("/api/save/current");
    if (res.ok) {
        const data = await res.json();
        dispatch(loadFavorites(data.Favorites));
    }
};

export const toggleFavorite = (spotId, isSaved) => async dispatch => {
    // Optimistic update so the heart responds instantly
    dispatch(isSaved ? removeFavorite(spotId) : addFavorite(spotId));
    try {
        await csrfFetch(`/api/save/${spotId}`, { method: isSaved ? "DELETE" : "POST" });
    } catch (e) {
        dispatch(isSaved ? addFavorite(spotId) : removeFavorite(spotId));
    }
};

// State: { [spotId]: Spot | true }
export default function favoritesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FAVORITES: {
            const newState = {};
            action.favorites.forEach(fav => {
                const spot = fav.Spot;
                if (!spot) return;
                const preview = spot.SpotImages && spot.SpotImages[0];
                newState[fav.spotId] = { ...spot, previewImage: preview ? preview.url : undefined };
            });
            return newState;
        }
        case ADD_FAVORITE:
            return { ...state, [action.spotId]: state[action.spotId] || true };
        case REMOVE_FAVORITE: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        case CLEAR_FAVORITES:
            return {};
        default:
            return state;
    }
}
