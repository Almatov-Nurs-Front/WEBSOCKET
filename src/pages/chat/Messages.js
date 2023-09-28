import { useEffect, useState } from 'react';
import classes from './Chat.module.scss';
import { Box, Container, Typography } from '@mui/material';


const Messages = ({ socket }) => {
  const [ messages, setMessages ] = useState([]);
  const user = sessionStorage.getItem('user1');

  useEffect(() => {
    socket.emit('render');
    socket.on('response', data => setMessages(data));

    return () => null;
  }, [socket]);
  console.log(messages);
  return (
    <div className={classes.messages}>
      <Container maxWidth="xl">
        <ul className={classes.message_list}>
          {
            messages.map((message, key) => (
              <li
                key={message.id + key}
                className={user === message.user ? classes.right : classes.left}
                >
                <Typography>{user === message.user ? 'Вы' : message.user}</Typography>
                <Box className={classes.message_block}>
                  {
                    message.images?.length
                      ?
                      <ul className={classes.message_images}>
                        {
                          message.images?.map((img, key) => {
                            return <li key={key}>
                              {
                                !(/data:video\/mp4/.test(img))
                                ?
                                <img src={img} alt={'image' + key} />
                                :
                                <video controls><source src={img}/></video>
                              }
                            </li>
                          })
                        }
                      </ul>
                      :
                      false
                  }
                  <Typography>{message.message}</Typography>
                </Box>
              </li>
            ))
          }
        </ul>
      </Container>
    </div>
  );
};

export default Messages;