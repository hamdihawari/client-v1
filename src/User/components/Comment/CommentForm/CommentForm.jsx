import React, { useState } from 'react'
import style from './style.module.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material'
import rtlStyle from './rtl.module.css'

export const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel }) => {
  const [text, setText] = useState(initialText);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() === '') {
      return;
    }
    handleSubmit(text, null);
    setText('');
  }

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
      <textarea
        type="text"
        value={text}
        placeholder="Add a comment"
        onChange={handleInputChange}
        autoFocus={false}
        onFocus={handleInputFocus}
      />
      {isInputFocused && (
        <div className={style.buttonContainer}>
          <Button variant="text" onClick={handleCancelButtonClick} className={style.cancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOnSubmit} className={style.enterButton}>
            Post
          </Button>
          {/* {hasCancelButton && (
            <Button variant="contained"
            className={style.cancelButton}
            onClick={handleCancel}
            >
            Cancel
          </Button>
          )} */}
        </div>
      )}
      {/* <ChatBubbleOutlineIcon className={style.icon} /> */}
    </form>
  )
}
