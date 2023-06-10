import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector} from "react-redux";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
   if(window.confirm('Are you sure you want to log out?')) { 
    dispatch(logout());
    window.localStorage.removeItem('token');
   }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>TECHTALES</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write an Article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create an Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
