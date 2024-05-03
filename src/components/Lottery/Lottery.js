import React, { useState } from 'react';
import './Lottery.css';
import CheckPrice from '../CheckPrice/CheckPrice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { LOTTERY_BUTTON_TEXT, LOTTERY_CAPTION } from '../../constants/common-constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const Lottery = () => {
    console.log('COMPONENT :: Lottery')

    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);  
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleLotteryButtonClick = () => {
        console.log('lottery button click')
        setButtonClicked(true);
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        const mobileNumber = input.slice(0, 10).replace(/\D/g, ''); 
        setPhoneNumber(mobileNumber);
      };

    const handleMessage = (message) => {
        setSuccessMessage(message);
    }

    const handleError = (message) => {
        setErrorMessage(message);
    }

  return (
    <section className='lottery'>
        {!buttonClicked && 
        <>
            <div className='input-section'>
                <p className='lottery-caption'>{LOTTERY_CAPTION}</p>  
                <Input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter mobile number"
                /> 
                <Button onClick={handleLotteryButtonClick} children={LOTTERY_BUTTON_TEXT} />            
            </div>
        </>
         }
        <p className='error'>{errorMessage}</p>
        {buttonClicked && 
            <ErrorBoundary>
                <CheckPrice phoneNumber={phoneNumber} setMessage={handleMessage} setError={handleError}/>
            </ErrorBoundary>
        }
        {successMessage && <h1>{successMessage}</h1> }
    </section>
  )
}

export default Lottery;