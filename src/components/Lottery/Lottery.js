import React, { useState } from 'react';
import './Lottery.css';
import CheckPrice from '../CheckPrice/CheckPrice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Lottery = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);  
    const [successMessage, setSuccessMessage] = useState('');

    const handleButtonClick = () => {
        setButtonClicked(true);
    };

    const handleMessage = (message) => {
        setSuccessMessage(message);
    }

  return (
    <section className='lottery'>      
        {!buttonClicked && <div className='input-section'>
            <p className='lottery-caption'>Your Mobile Number can buy you exciting prices</p>  
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter mobile number"
            /> 
            <button onClick={handleButtonClick}>I'm Feeling Lucky</button>
            
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