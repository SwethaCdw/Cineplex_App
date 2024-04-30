import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_NOT_FOUND } from '../../constants/common-constants';
// import { ERROR_PAGE } from '../../constants/constants';

const NotFound = () => {
  const navigate = useNavigate();
  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    if (!toastDisplayed) {

    toast.error(PAGE_NOT_FOUND)
    setToastDisplayed(true);
    navigate('/');
    }
  }, [navigate, toastDisplayed]);

  return null;
};

export default NotFound;