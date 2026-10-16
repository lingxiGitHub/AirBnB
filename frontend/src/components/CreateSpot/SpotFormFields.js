// Shared field layout for the create and edit listing modals
export default function SpotFormFields({ values, set, includePhoto }) {
    const input = (key, label, props = {}) => (
        <label className="field">
            <span className="field-label">{label}</span>
            <input
                type="text"
                value={values[key]}
                onChange={(e) => set[key](e.target.value)}
                required
                {...props}
            />
        </label>
    );

    return (
        <>
            <h3 className="spot-form-section">Where's your place located?</h3>
            <div className="field-group">
                {input("address", "Street address")}
                {input("city", "City")}
                <div className="field-row">
                    {input("state", "State / province")}
                    {input("country", "Country")}
                </div>
            </div>

            <h3 className="spot-form-section">Describe your place</h3>
            <div className="field-group">
                {input("name", "Title", { maxLength: 50 })}
                <label className="field">
                    <span className="field-label">Description</span>
                    <textarea
                        rows={4}
                        value={values.description}
                        onChange={(e) => set.description(e.target.value)}
                        required
                    />
                </label>
            </div>

            <h3 className="spot-form-section">Set your price</h3>
            <div className="field-group">
                {input("price", "Price per night (USD)", { type: "number", min: 1, step: 1 })}
            </div>

            {includePhoto && (
                <>
                    <h3 className="spot-form-section">Add a cover photo</h3>
                    <div className="field-group">
                        {input("url", "Photo URL", { type: "url" })}
                    </div>
                    {values.url && (
                        <img
                            className="spot-form-preview"
                            src={values.url}
                            alt="Cover preview"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                            onLoad={(e) => { e.currentTarget.style.display = "block"; }}
                        />
                    )}
                </>
            )}
        </>
    );
}
