import React from 'react';
import NavBar from './NavBar';
import Messages from './Messages';
import Message from './Message';
import classes from './Chat.module.scss';


const Chat = ({ socket }) => {
  return (
    <div className={classes.main}>
      <NavBar/>
      <Messages socket={socket}/>
      <Message socket={socket}/>
    </div>
  );
};

export default Chat;
