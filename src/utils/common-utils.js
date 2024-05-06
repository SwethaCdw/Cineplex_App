import { FALLBACK_IMAGE } from "../constants/common-constants";
import { DOUBLE_DIGIT_START, SECONDS_IN_MINUTE } from "../constants/time-constants";

  
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
    const minutes = Math.floor(counter / SECONDS_IN_MINUTE); 
    const seconds = counter % SECONDS_IN_MINUTE; 

    const formattedSeconds = seconds < DOUBLE_DIGIT_START ? `0${seconds}` : seconds;

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