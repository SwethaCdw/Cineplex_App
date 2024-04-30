import React from 'react';
import './Languages.css';
import { LANGUAGES, VIEW_OTHER_LANGUAGES } from '../../constants/common-constants';

const Languages = () => {
    return (
        <section className='other-languages'>
            <p>{VIEW_OTHER_LANGUAGES}</p>  
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