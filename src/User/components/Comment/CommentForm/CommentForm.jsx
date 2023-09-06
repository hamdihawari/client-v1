import React, { useState } from 'react'
import axios from 'axios'
import style from './style.module.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material'
import rtlStyle from './rtl.module.css'

export const CommentForm = ({ handleSubmit, imageID }) => {
  const [text, setText] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if (text.trim() === '') {
      return
    }
    try {
      const response = await axios.post('http://localhost:9000/getComments', {
        body: text,
        userId: '1',
        imageID: imageID,
        parentId: null,
        username: 'Johanna',
        createdAt: new Date().toISOString(),
      });
      console.log('Created comment:', response.data)
      setText('');
      handleSubmit(response.data);
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value)
  };

    const handleInputFocus = () => {
    setInputFocused(true)
  };

  const handleCancelButtonClick = () => {
    setText('');
    setInputFocused(false)
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Add a comment"
        onChange={handleInputChange}
        autoFocus={false}
        onFocus={handleInputFocus}
      />
      {isInputFocused && (
        <div className={style.buttonContainer}>
           <Button variant="text" onClick={handleCancelButtonClick} className={style.cancelButton}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOnSubmit} className={style.enterButton}>
            Post
          </Button>
        </div>
      )}
      <ChatBubbleOutlineIcon className={style.icon} />
    </form>
  )
}