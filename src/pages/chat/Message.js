import { Button, Container, IconButton, TextField } from '@mui/material';
import classes from './Chat.module.scss';
import { useState } from 'react';
import { Photo, Send } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiPicker from 'emoji-picker-react';


const Message = ({ socket }) => {
  const [ emojiOpen, setEmojiOpen ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ images, setImages ] = useState([]);
  const user = sessionStorage.getItem('user1');

  const handleSend = e => {
    e.preventDefault();
    if ((message.trim() && user) || (images.length)) {
      socket.emit('message', {
        message,
        images,
        user,
        id: socket.id
      });

      setMessage('');
      setImages([]);
    }
  };

  const addUrl = file => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = e => {
      setImages(prev => [ ...prev, e.target.result ].slice(0, 4));
    };
  };

  const handleImageUpload = async ({ target }) => {
    [ ...target.files ].forEach(file => addUrl(file));
  };

  const handleEmojiClick = () => setEmojiOpen(prev => !prev);

  return (
    <div className={classes.message}>
      <Container maxWidth="xl">
        {
          images.length
          ?
          <ul className={classes.images}>
            {
              images.map((image, key) => (
                <li key={key}>
                  {
                    !(/data:video\/mp4/.test(image))
                      ?
                      <img src={image} alt={'image' + key} />
                      :
                      <video>
                        <source src={image} type='video/mp4'/>
                      </video>
                  }
                </li>
              ))
            }
          </ul>
          :
          false
        }
        <form onSubmit={handleSend} className={classes.form}>
          <TextField
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            color='success'
            className={classes.input}
            placeholder='Сообщение...'
          />
          <Button className={classes.send} color='inherit' variant='text'>
            <label htmlFor='image'>
              <Photo/>
              <input multiple hidden id='image' type="file" onChange={handleImageUpload}/>
            </label>
          </Button>
          <IconButton className={classes.send} onClick={handleEmojiClick}><InsertEmoticonIcon/></IconButton>
          <IconButton className={classes.send} type='submit'><Send/></IconButton>
        </form>
        {emojiOpen && <div className={classes.emoji}>
          <div className={classes.emoji} onClick={() => setEmojiOpen(false)}></div>
          <EmojiPicker onEmojiClick={({ emoji }) => setMessage(prev => prev + emoji)}/>
          </div>}
      </Container>
    </div>
  );
};

export default Message;