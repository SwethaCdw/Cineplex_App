import React from 'react';
import './Languages.css';
import { LANGUAGES } from '../../constants/constants';

const Languages = () => {
    return (
        <section className='other-languages'>
            <p>View in Other Languages</p>  
            <ul className='language-list'>
            {LANGUAGES.map((language) => {
                    return (
                        <li className='language' key={language}>{language}</li>
                    );
            })} 
        </ul>
        </section>
    )
}

export default Languages;