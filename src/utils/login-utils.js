import { Link } from "react-router-dom";
import { ROUTES } from "../constants/route-constants";
import { getItemFromLocalStorage, setItemInLocalStorage } from "./local-storage-utils";

export const getUsername = () => {
    const username = getItemFromLocalStorage('username');
    return username;
}

 /**
   * Handle Logout
   */
export const handleLogout = () => {
    setItemInLocalStorage('username', '');
    return <Link to={ROUTES.LOGIN} />
  }