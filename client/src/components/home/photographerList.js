import React from 'react'

import { Route, Link } from 'react-router-dom';


//Return photographer list
//The list can be render filtered by tag
const PhotographerList = ({ photographer}) => {
    return (
        <>
        <div className="photographer" id={`photographer-${photographer.id}`}>
                <div className="photographer__img">
                    <Link to={`/${photographer.id}`} className="photographer__img__link">
                        <img src={`${window.location.origin}/img/Photographers_ID_Photos/${photographer.portrait}`} alt={photographer.nom} />
                        <h2>{photographer.nom}</h2>
                    </Link>
                </div>
                <div className="photographer__text">
                    <p className="photographer__text__localisation">{photographer.ville}, {photographer.country || photographer.pays}</p>
                    <p className="photographer__text__desc">{photographer.tagline}</p>
                    <p className="photographer__text__price">{`${photographer.prix}€ /jour`}</p>
                </div>
                <ul className="photographer__tag">
                    {photographer.tags.map((tag,index) => {
                        return (
                            <li key={index}>
                                <span aria-hidden="false">{`#${tag}`}</span>
                            </li>
                        );
                    })}
                </ul>
        </div>
        </>
    )
}

export default PhotographerList;