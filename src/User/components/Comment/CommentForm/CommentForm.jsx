import React, { useState } from 'react'
import style from './style.module.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material'
import rtlStyle from './rtl.module.css'

export const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel }) => {
  const [text, setText] = useState(initialText);

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

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={text}
        placeholder='Add a comment'
        onChange={handleInputChange}
        autoFocus={false}
        onFocus={handleInputFocus}
      />
      <div className={style.buttonContainer}>
        <Button variant="contained" onClick={handleOnSubmit} className={style.postButton}>{submitLabel}</Button>
        {hasCancelButton && (
          <div className={style.nestedbuttonContainer}>
            <Button variant="text" onClick={handleCancel} className={style.cancel}>Close</Button>
          </div>
        )}
      </div>
      <ChatBubbleOutlineIcon className={style.icon} />
    </form>
  )
}

/* const [isInputFocused, setInputFocused] = useState(false); */
/* const handleCancelButtonClick = () => {
  setText('');
  setInputFocused(false)
}; */

{/* {isInputFocused && (
        <div className={style.buttonContainer}>
          <Button variant="contained" onClick={handleOnSubmit} className={style.enterButton}>{submitLabel}</Button>
          <Button variant="text" onClick={handleCancelButtonClick} className={style.cancel}>Cancel</Button>
        </div>
      )} */}

{/* <ChatBubbleOutlineIcon className={style.icon} /> */ }
