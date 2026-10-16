// Airbnb shows ratings like "4.87" or "5.0", and "New" for unrated listings
export function formatRating(rating) {
    const n = Number(rating);
    if (!rating || Number.isNaN(n) || n === 0) return "New";
    return Number.isInteger(n) ? n.toFixed(1) : String(Math.round(n * 100) / 100);
}

export function formatPrice(price) {
    return `$${Number(price).toLocaleString("en-US")}`;
}

export function pluralize(count, word) {
    return `${count} ${word}${Number(count) === 1 ? "" : "s"}`;
}
