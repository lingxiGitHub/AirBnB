// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal, setModalContent } = useModal();

    const logIn = (creds) => {
        setErrors([]);
        return dispatch(sessionActions.login(creds))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
                else if (data && data.message) setErrors([data.message]);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn({ credential, password });
    };

    return (
        <ModalShell title="Log in">
            <h2 className="modal-heading">Welcome to AirClone</h2>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <div className="field-group">
                    <label className="field">
                        <span className="field-label">Email or username</span>
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            autoFocus
                            required
                        />
                    </label>
                    <label className="field">
                        <span className="field-label">Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className="btn btn-primary btn-block auth-submit" type="submit">Continue</button>
            </form>

            <div className="auth-or"><span>or</span></div>

            <button
                className="btn btn-outline btn-block auth-alt"
                onClick={() => logIn({ credential: "demo@user.io", password: "password" })}
            >
                <FiUser className="auth-alt-icon" />
                Continue as demo user
            </button>

            <p className="auth-switch">
                Don't have an account?{" "}
                <button className="btn-link" onClick={() => setModalContent(<SignupFormModal />)}>Sign up</button>
            </p>
        </ModalShell>
    );
}

export default LoginFormModal;
