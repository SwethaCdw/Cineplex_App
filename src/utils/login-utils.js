import { getItemFromLocalStorage } from "./local-storage-utils";

export const getUsername = () => {
    const username = getItemFromLocalStorage('username');
    return username;
}