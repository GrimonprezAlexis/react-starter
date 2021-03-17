import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../home/home.scss'; 
import './photographerDetail.scss';

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
        </main>
        </>
    );
}
export default PhotographerDetail;