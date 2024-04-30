import React, { useState } from 'react';
import './Lottery.css';
import CheckPrice from '../CheckPrice/CheckPrice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { LOTTERY_BUTTON_TEXT, LOTTERY_CAPTION } from '../../constants/common-constants';

const Lottery = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);  
    const [successMessage, setSuccessMessage] = useState('');

    const handleLotteryButtonClick = () => {
        setButtonClicked(true);
    };

    const handleMessage = (message) => {
        setSuccessMessage(message);
    }

  return (
    <section className='lottery'>      
        {!buttonClicked && <div className='input-section'>
            <p className='lottery-caption'>{LOTTERY_CAPTION}</p>  
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter mobile number"
            /> 
            <button onClick={handleLotteryButtonClick}>{LOTTERY_BUTTON_TEXT}</button>
            
        </div> }
        {buttonClicked && 
            <ErrorBoundary>
                <CheckPrice phoneNumber={phoneNumber} setMessage={handleMessage}/>
            </ErrorBoundary>
        }
        {successMessage && <h1>{successMessage}</h1> }
    </section>
  )
}

export default Lottery;