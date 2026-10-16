import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import {
    FiAward, FiKey, FiCalendar, FiShare, FiEdit2, FiTrash2, FiGrid,
    FiWifi, FiCoffee, FiMonitor, FiImage, FiTriangle, FiHome
} from "react-icons/fi";
import { getSingleSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import UpdateSpot from "../UpdateSpot";
import DisplayReview from "../Review";
import DeleteSpot from "../DeleteSpot";
import Booking from "../Booking";
import HeartButton from "../HeartButton";
import { formatRating, pluralize } from "../../utils/format";
import "./SingleSpot.css";

const HIGHLIGHTS = [
    { icon: FiAward, title: host => `${host} is a Superhost`, text: "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests." },
    { icon: FiKey, title: () => "Self check-in", text: "Check yourself in with the keypad." },
    { icon: FiCalendar, title: () => "Free cancellation for 48 hours", text: "Get a full refund if you change your mind." },
];

const AMENITIES = [
    { icon: FiTriangle, label: "Mountain view" },
    { icon: FiImage, label: "Valley view" },
    { icon: FiCoffee, label: "Kitchen" },
    { icon: FiWifi, label: "Wifi" },
    { icon: FiMonitor, label: "Dedicated workspace" },
];

function PhotoGallery({ images, name }) {
    return (
        <ModalShell title="Photo tour" width="960px">
            <div className="gallery">
                {images.map(img => (
                    <img key={img.id} src={img.url} alt={name} loading="lazy" />
                ))}
            </div>
        </ModalShell>
    );
}

function SingleSpotComponent() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);
    const [copied, setCopied] = useState(false);

    const singleSpot = useSelector(state => state.spots.singleSpot);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        setIsLoaded(false);
        dispatch(getSingleSpot(+spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    if (!isLoaded || !singleSpot || +singleSpot.id !== +spotId) {
        return (
            <main className="page-narrow spot-page">
                <div className="skeleton" style={{ height: 32, width: "50%", marginBottom: 24 }} />
                <div className="skeleton photo-grid-skeleton" />
            </main>
        );
    }

    const isOwner = sessionUser && +sessionUser.id === +singleSpot.ownerId;
    const hostName = singleSpot.Owner.firstName;
    const images = [...singleSpot.SpotImages].sort((a, b) => b.preview - a.preview);
    const mosaic = images.slice(0, 5);
    const rating = formatRating(singleSpot.avgStarRating);

    const share = () => {
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openGallery = () => setModalContent(<PhotoGallery images={images} name={singleSpot.name} />);

    return (
        <main className="page-narrow spot-page">
            {/* ---------- Title ---------- */}
            <div className="spot-title-bar">
                <h1 className="spot-title">{singleSpot.name}</h1>
                <div className="spot-actions">
                    <button className="btn-ghost" onClick={share}>
                        <FiShare /> {copied ? "Link copied" : "Share"}
                    </button>
                    {isOwner ? (
                        <>
                            <button
                                className="btn-ghost"
                                onClick={() => setModalContent(<UpdateSpot singleSpot={singleSpot} />)}
                            >
                                <FiEdit2 /> Edit
                            </button>
                            <button
                                className="btn-ghost"
                                onClick={() => setModalContent(<DeleteSpot singleSpot={singleSpot} />)}
                            >
                                <FiTrash2 /> Delete
                            </button>
                        </>
                    ) : (
                        <HeartButton spotId={singleSpot.id} variant="inline" />
                    )}
                </div>
            </div>

            {/* ---------- Photos ---------- */}
            <section className={`photo-grid photo-count-${mosaic.length}`}>
                {mosaic.map((img, i) => (
                    <button key={img.id} className={`photo-cell photo-${i}`} onClick={openGallery}>
                        <img src={img.url} alt={singleSpot.name} />
                    </button>
                ))}
                {mosaic.length === 0 && <div className="photo-cell photo-empty"><FiHome /></div>}
                {images.length > 1 && (
                    <button className="show-all-photos" onClick={openGallery}>
                        <FiGrid /> Show all photos
                    </button>
                )}
            </section>

            {/* ---------- Body ---------- */}
            <div className="spot-body">
                <div className="spot-main">
                    <section className="spot-section spot-overview">
                        <h2>Entire home in {singleSpot.city}, {singleSpot.state}</h2>
                        <p className="spot-specs">4 guests · 2 bedrooms · 2 beds · 1 bath</p>
                        <a href="#reviews" className="spot-rating-link">
                            <FaStar className="star-icon" /> {rating}
                            <span className="dot">·</span>
                            <u>{pluralize(singleSpot.numReviews, "review")}</u>
                        </a>
                    </section>

                    <hr className="divider" />

                    <section className="spot-section host-row">
                        <span className="avatar avatar-md">{hostName[0]}</span>
                        <div>
                            <div className="host-row-title">Hosted by {hostName}</div>
                            <div className="muted">Superhost · {singleSpot.city}, {singleSpot.country}</div>
                        </div>
                    </section>

                    <hr className="divider" />

                    <section className="spot-section highlights">
                        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                            <div className="highlight" key={text}>
                                <Icon className="highlight-icon" />
                                <div>
                                    <div className="highlight-title">{title(hostName)}</div>
                                    <div className="muted">{text}</div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <hr className="divider" />

                    <section className="spot-section">
                        <img
                            className="aircover"
                            src="https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg"
                            alt="AirCover"
                        />
                        <p className="body-text">
                            Every booking includes free protection from Host cancellations, listing
                            inaccuracies, and other issues like trouble checking in.
                        </p>
                    </section>

                    <hr className="divider" />

                    <section className="spot-section">
                        <h2 className="section-title">About this place</h2>
                        <p className="body-text description">{singleSpot.description}</p>
                    </section>

                    <hr className="divider" />

                    <section className="spot-section">
                        <h2 className="section-title">What this place offers</h2>
                        <div className="amenities">
                            {AMENITIES.map(({ icon: Icon, label }) => (
                                <div className="amenity" key={label}>
                                    <Icon className="amenity-icon" /> {label}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="spot-aside">
                    <Booking spotId={spotId} singleSpot={singleSpot} isOwner={isOwner} />
                </aside>
            </div>

            <hr className="divider" />

            <DisplayReview singleSpot={singleSpot} spotId={spotId} />

            <hr className="divider" />

            {/* ---------- Host ---------- */}
            <section className="spot-section-lg">
                <h2 className="section-title">Meet your host</h2>
                <div className="host-card-wrap">
                    <div className="host-card">
                        <span className="avatar avatar-xl">{hostName[0]}</span>
                        <div className="host-card-name">{hostName}</div>
                        <div className="host-card-sub"><FiAward /> Superhost</div>
                    </div>
                    <div className="host-about">
                        <h3>During your stay</h3>
                        <p className="body-text">
                            We want to honor your privacy and the solitude this home provides. However, we are
                            always available by text, email, or phone and can be there quickly. (Number provided
                            before check-in.)
                        </p>
                    </div>
                </div>
            </section>

            <hr className="divider" />

            {/* ---------- Things to know ---------- */}
            <section className="spot-section-lg">
                <h2 className="section-title">Things to know</h2>
                <div className="things-grid">
                    <div>
                        <h3>House rules</h3>
                        <p>Check-in after 4:00 PM</p>
                        <p>Checkout before 11:00 AM</p>
                        <p>4 guests maximum</p>
                    </div>
                    <div>
                        <h3>Safety & property</h3>
                        <p>Security camera/recording device</p>
                        <p>Carbon monoxide alarm</p>
                        <p>Smoke alarm</p>
                    </div>
                    <div>
                        <h3>Cancellation policy</h3>
                        <p>Free cancellation for 48 hours after booking.</p>
                        <p>Review the Host's full cancellation policy, which applies even if you cancel for illness.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default SingleSpotComponent;
