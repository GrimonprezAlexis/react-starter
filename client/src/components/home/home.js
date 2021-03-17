import React, { useState, useEffect } from "react";
import TagsNavigation from './tagsNavigation';
import PhotographerList from './photographerList';
import './home.scss';

import { Link } from 'react-router-dom';


const Home = ({ match }) => {

  const [photographers, setPhotographers] = useState([]);
  const [photographersTags, setPhotographersTags] = useState([]);
  const [photographersFiltered, setSearchPhotographers] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);


  //replace componentDidMonth
    useEffect(() => {
        fetchPhotographers();
        fetchPhotographersTags();
    }, []);

    //Get the photographers from API
    const fetchPhotographers = async () => {
        const response = await fetch('api/photographers');
        const data = await response.json();
        setPhotographers(data);
        setSearchPhotographers(data);
    }

    //Get all tags rather than list photographers
    const fetchPhotographersTags = async () => {
        const response = await fetch('api/photographers/tags');
        const data = await response.json();
       setPhotographersTags(data);
    }

    //Filter photographer by selectedTag
    const handleFilterByTag = (e) => {
        e.preventDefault();
        const selectedTag = e.target.textContent.slice(1).toLowerCase();
        const wantedPhotographers = photographers.filter(photographer => { 
            return photographer.tags.indexOf(selectedTag) > -1; 
        });
        setSearchPhotographers(wantedPhotographers);
        let tagEvent = e ? parseInt(e.target.parentElement.id, 10) : null;
        setClickedItem(tagEvent);
    }


    return (
        <>
        <div className="cta__main" id="scrollToMain">
            <a href="#main" className="cta__main__scroll">Passer au contenu</a>
        </div>

        <header className="header" role="banner">
            <Link to={`${match.url}`}>
                <img src={`${window.location.origin}/img/logo.png`}  alt="Fisheye Home page" className="header__logo"/>
            </Link>

            <TagsNavigation tags={photographersTags} handleFilterByTag={handleFilterByTag} clickedItem={clickedItem}/>

            <h1 className="header__title">Nos photographes</h1>
        </header>
        <main className="container__main" id="main">{
            photographersFiltered.map(( p, index ) => (
                <PhotographerList photographer={p} key={index}/> 
            ))
        }</main>
        </>
    )
}

export default Home;