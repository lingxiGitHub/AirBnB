import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "../LoginFormModal/LoginForm.css";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal, setModalContent } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setErrors(['Confirm Password field must be the same as the Password field']);
        }
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Sign up">
            <h2 className="modal-heading">Finish signing up</h2>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <div className="field-group">
                    <label className="field">
                        <span className="field-label">First name</span>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus required />
                    </label>
                    <label className="field">
                        <span className="field-label">Last name</span>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </label>
                </div>
                <p className="form-hint">Make sure it matches the name on your government ID.</p>

                <div className="field-group signup-block">
                    <label className="field">
                        <span className="field-label">Email</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label className="field">
                        <span className="field-label">Username</span>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>

                <div className="field-group signup-block">
                    <label className="field">
                        <span className="field-label">Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label className="field">
                        <span className="field-label">Confirm password</span>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </label>
                </div>

                <button className="btn btn-primary btn-block auth-submit" type="submit">Agree and continue</button>
            </form>

            <p className="auth-switch">
                Already have an account?{" "}
                <button className="btn-link" onClick={() => setModalContent(<LoginFormModal />)}>Log in</button>
            </p>
        </ModalShell>
    );
}

export default SignupFormModal;
