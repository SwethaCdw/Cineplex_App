import React, { useEffect } from 'react';

const CheckPrice = ({phoneNumber, setMessage, setError}) => {

    useEffect(() => {
   if (!phoneNumber || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
        // Invalid phone number format
        setError('Invalid phone number')
        return;
      }
  
      if (parseInt(phoneNumber.charAt(9)) % 2 === 0) {
        setMessage('Hurray! You won a free ticket to Blind Date on Wednesday');
      } else {
        throw new Error('Sorry! Better Luck Next Time');
      }
    }, [phoneNumber, setMessage, setError])

    return (
        <>
        </>
    )
}

export default CheckPrice;