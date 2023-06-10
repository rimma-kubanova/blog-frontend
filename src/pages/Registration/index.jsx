import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { fetchAuth,fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit, 
    formState: { errors, isValid}
  } = useForm({
    defaultValues:{
      fullName: 'Rimma',
      email: '123@gmail.com',
      password:'12345'
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if(!data.payload){
      return alert('Could not sign out');
    }
    
    if('token' in data.payload ){
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if(isAuth){
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
     <form onSubmit={handleSubmit(onSubmit)}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an Account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField  error={Boolean(errors.fullName ?.message)}
        helperText= {errors.fullName ?.message}
        {...register('fullName', {required: 'Please enter your Full Name'})}
        className={styles.field} label="Full Name" fullWidth />

      <TextField  error={Boolean(errors.email ?.message)}
        helperText= {errors.email ?.message}
        type='email'
        {...register('email', {required: 'Please enter your email'})}
        className={styles.field} label="E-Mail" fullWidth />

      <TextField  error={Boolean(errors.password ?.message)}
        helperText= {errors.password ?.message}
        type='password'
        {...register('password', {required: 'Please enter your password'})}
        className={styles.field} label="password" fullWidth />

      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Sign Up
      </Button>
      </form>
    </Paper>
  );
};
