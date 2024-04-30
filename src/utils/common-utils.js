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