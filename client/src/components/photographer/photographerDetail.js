import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../home/home.scss'; 
import './photographerDetail.scss';

import Galerie from './galerie';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


const PhotographerDetail = ({ match }) => {
    const [photographer, setPhotographer] = useState({});
    const [tags, setTags] = useState([]);
    const [open, setOpen] = useState(false);

    //replace componentDidMonth
    useEffect(() => {
        fetchPhotographerById();
    }, []);

    //Get the photographer by ID from API
    const fetchPhotographerById = async () => {
        const response = await fetch(`api/photographers/${match.params.id}`);
        const data = await response.json();
        setPhotographer(data);
        setTags(data.tags);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
        <header className="container" role="banner" id="header__photographer">
            <Link to={`/`}>
                <img src={`${window.location.origin}/img/logo.png`}  alt="Fisheye Home page" className="header__logo"/>
            </Link>
        </header>
        <main>
            <div className="main__photographer">
                <div className="main__photographer__width">
                    <h1>{photographer.nom}</h1>
                    <p className="main__photographer__localisation">{photographer.ville}, {photographer.country || photographer.pays}</p>
                    <p className="main__photographer__tagline">{photographer.tagline}</p>
                    <ul className="main__photographer__tag">
                        {tags.map((tag, index) => {
                            return (
                                <li key={index}><span aria-hidden="false">{`#${tag}`}</span></li>
                            );
                        })}
                    </ul>
                </div>
                <div className="main__photographer__button">
                    <button tabIndex="0" onClick={handleClickOpen} aria-labelledby="Contactez-moi">Contactez-moi</button>
                </div>
                {
                    photographer.portrait 
                    ?
                        <div className="photographer__img__link">
                            <img src={`${window.location.origin}/img/Photographers_ID_Photos/${photographer.portrait}`} alt={photographer.nom} />
                        </div>
                    : 
                    null
                }
            </div>
            <Galerie photographerId={match.params.id} photographerPrice={photographer.prix}/>
        </main>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <div aria-labelledby={`Contact me ${photographer.nom}`}>

                <div className="modal__header">
                        <h1>Contactez-moi</h1>
                        <Button aria-labelledby="Fermer formulaire contact" onClick={handleClose}>X</Button>
                </div>

                <div className="modal__header__sub">
                    <h1>{photographer.nom}</h1>
                </div>

                <div className="modal__body">
                    <form>
                    <div className="modal__formGroup">
                        <label htmlFor="surname">Prénom</label>
                        <input twpe="text" id="surname" aria-labelledby="Prénom" className="modal__formGroup"/>
                    </div>
                    <div className="modal__formGroup">
                        <label htmlFor="name">Nom</label>
                        <input twpe="text" id="name" aria-labelledby="Nom"/>
                    </div>
                    <div className="modal__formGroup">
                        <label htmlFor="email">Email</label>
                        <input twpe="email" id="email" aria-labelledby="Email"/>
                    </div>
                    <div className="modal__formGroup">
                        <label htmlFor="message">Votre message</label>
                        <textarea id="message" name="message" rows="6" cols="50" aria-labelledby="Votre message"></textarea>
                    </div>
                    <button aria-labelledby="Envoyez" className="modal__submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </Dialog>
        </>
    );
}
export default PhotographerDetail;