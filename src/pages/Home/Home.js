import React from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import coverPicture from '../../assets/background.png';
import { handleImageError } from '../../utils/common-utils';
import Lottery from '../../components/Lottery/Lottery';
import Trailers from '../../components/Trailers/Trailers';
import Languages from '../../components/Languages/Languages';
import ShortTeasers from '../../components/ShortTeasers/ShortTeasers';
import Image from '../../common/Image/Image';

const Home = () => {
  console.log('COMPONENT :: Home')

  return (
    <>
    <Header/>
    <Image className='cover-picture' src={coverPicture} onError={handleImageError} alt='background' />
    <Lottery />
    <Trailers />
    <ShortTeasers />
    <Languages />
    </>
  )
}

export default Home;