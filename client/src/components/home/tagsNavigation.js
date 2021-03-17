import React from 'react'

const TagsNavigation = ({ tags, handleFilterByTag, clickedItem }) => {
    return (
        <>
        <nav role="navigation" aria-label="photographer categories" aria-labelledby="Photographer categories">
            <div className="header__navigation__list">
                {tags.map((tag,index) => {
                    return (
                        <button key={index}  onClick={handleFilterByTag} id={index}
                            className="button button-group"  type="button"  aria-labelledby={`#${tag}`}
                             className={index === clickedItem ? 'is-checked' : null}
                            role="navigation" tabIndex="0"><span aria-hidden="false">{`#${tag}`}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
        </>
    )
}

export default TagsNavigation;