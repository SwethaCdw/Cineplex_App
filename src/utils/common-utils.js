import { FALLBACK_IMAGE } from "../constants/common-constants";

  
/**
 * Add a fallback picture if picture is not available
 * @param {*} event 
 */
export const handleImageError = (event) => {
    event.target.src = FALLBACK_IMAGE;
};

/**
 * get Random array value
 * @param {*} array 
 * @returns 
 */
export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Convert counter to a format
 * @param {*} counter 
 * @returns 
 */
export const formatCounter = (counter) => {
    const minutes = Math.floor(counter / 60); 
    const seconds = counter % 60; 

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
}

/**
 * Restrict given input to given length
 * @param {*} input 
 * @param {*} length 
 * @returns 
 */
export const restrictInput = (input, length) => {
    const resultInput = input.slice(0, length).replace(/\D/g, '')
    return resultInput;
}