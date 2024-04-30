import React from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import coverPicture from '../../assets/background.png';
import { handleImageError } from '../../utils/common-utils';
import Lottery from '../../components/Lottery/Lottery';
import Trailers from '../../components/Trailers/Trailers';
import Languages from '../../components/Languages/Languages';
import ShortTeasers from '../../components/ShortTeasers/ShortTeasers';

const Home = () => {
  return (
    <>
    <Header/>
    <img className='cover-picture' src={coverPicture} onError={handleImageError} alt='background'></img>
    <Lottery />
    <Trailers />
    <ShortTeasers />
    <Languages />
    </>
  )
}

export default Home;