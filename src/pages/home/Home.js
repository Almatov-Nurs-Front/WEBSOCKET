import React, { useState } from 'react';
import classes from './Home.module.scss';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const [ user, setUser ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await sessionStorage.setItem('user1', user);
    await navigate('/chat');
  };
  return (
    <div className={classes.main}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1>Войти в чат</h1>
        <TextField label='Имя пользователя' color='success' value={user} onChange={({ target }) => setUser(target.value)} />
        <Button type='submit' color="success" variant="contained">Войти</Button>
      </form>
    </div>
  );
};

export default Home;