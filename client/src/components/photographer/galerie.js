import React, { useState, useEffect } from "react";
import _ from 'lodash';

//https://www.npmjs.com/package/simple-react-lightbox#options
import { SRLWrapper } from "simple-react-lightbox";

import './galerie.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faHeart);

const Galerie = ({ photographerId, photographerPrice }) => {    
    const [medias, setMedias] = useState([]);
    
    const options = {
    settings: {
        autoplaySpeed: 3000,
        boxShadow: 'none',
        disableKeyboardControls: false,
        disablePanzoom: false,
        disableWheelControls: false,
        hideControlsAfter: 3000,
        lightboxTransitionSpeed: 0.3,
        lightboxTransitionTimingFunction: 'linear',
        overlayColor: 'rgba(30, 30, 30, 0.9)',
        slideAnimationType: 'fade',
        slideSpringValues: [300, 50],
        slideTransitionSpeed: 0.6,
        slideTransitionTimingFunction: 'linear',
        usingPreact: false
    }
    };

    //replace componentDidMonth
    useEffect(() => {
        fetchMediaByPhotographerId();
    }, []);
    
    //Get the medias by ID from API
    const fetchMediaByPhotographerId = async () => {
        const response = await fetch(`api/photographers/${photographerId}/medias`);
        const data = await response.json();
        setMedias(_.orderBy(data, 'date'));
    };
    
    //Add likes onclick
    const handleLike = (id) => {
        const newMedias = [...medias];
        const mediasUntouched = newMedias.filter(m => m.id !== id);
        const mediaToUpdate = _.find(newMedias, {id});
        mediaToUpdate.like++;
        mediasUntouched.push(mediaToUpdate);
        const sortedMedia = _.orderBy(mediasUntouched, 'date');
        setMedias(sortedMedia);
    };


    const handleSort = (e) => {
        let wantedMedias = _.orderBy(medias, e.target.value);

        //date, popularity == like, title
        if(e.target.value === 'like') wantedMedias.reverse() //Les plus populaires selon nombre de likes
        setMedias(wantedMedias);
    }

    let totalLikes = _.sumBy(medias, 'like');

    return (
        <>
        <div className="listbox__container">
            <label htmlFor="order" className="listbox__label">Trier par</label>
            <select name="order" id="order" className="listbox__select"
                tabIndex="0"  aria-activedescendant="order"
                aria-labelledby="Order by" aria-label="Order by" onChange={handleSort}>
                <option value="" disabled="disabled"></option>
                <option value="date">Date</option>
                <option value="" disabled="disabled" className="white">─────────</option>
                <option value="like">Popularité</option>
                <option value="" disabled="disabled" className="white">─────────</option>
                <option value="titre">Titre</option>
                <option value="" disabled="disabled"></option>
            </select>
        </div>
        <SRLWrapper options={options}>
        <section className="galerie" aria-label="image closeup view">
            <div className="galerie__totalLikes">
                <div className="galerie__totalLikes__number">
                    <p>{totalLikes}</p>
                    <button className="galerie__detail__addLike">
                        <img src={`${window.location.origin}/img/like_black.png`}  alt="Like" className="header__logo"/>
                    </button>
                </div>
                <div>
                    <p>{photographerPrice} € /jour</p>
                </div>
            </div>

            {medias.map((media, index) => {
                return (
                    <div className={`galerie__item`} key={index}>
                        <div>
                        {media.image 
                            ? 
                            <img src={`${window.location.origin}/img/${media.photographerName}/${media.image}`} 
                            alt={`${media.titre}`} className="galerie__item__image" />
                            :
                            <video controls className="galerie__item__video">
                                <source src={`${window.location.origin}/img/${media.photographerName}/${media.video}`} type="video/mp4"></source>
                            </video>
                        }
                        </div>
                        <div className="galerie__detail">
                            <div className="galerie__detail-text">
                                <p className="galerie__detail__text">{`${media.titre}`}</p>
                                <div className="galerie__detail__price-like">
                                    <p className="galerie__detail__price">{`${media.prix}`}€</p>
                                    <p className="galerie__detail__like">{`${media.like}`}</p>
                                    <button className="galerie__detail__addLike" onClick={() => handleLike(media.id)} aria-labelledby="Likes">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
        </SRLWrapper>
        </>
    );
}
export default Galerie;