import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './style.module.css'
import { Comment } from '../Comment/Comment'
import { CommentForm } from '../CommentForm/CommentForm'

export const Comments = ({ imageID, customStyle }) => {
  const [beackendComments, setBackendComments] = useState([])
  const getCommentstUrl = "http://localhost:9000/getComments"

  const beackendCommentsFilter = beackendComments.filter(
    (beackendComment) => beackendComment.parentId === null && beackendComment.imageID === imageID
  )

  const getReplies = commentId => {
    return beackendComments.filter(beackendComment => beackendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }

  const addComment = (text, parentId) => {
    console.log("addComment", text, parentId);
  };

  useEffect(() => {
    axios.get(getCommentstUrl).then((res) => {
      setBackendComments(res.data)
    })
  }, [])

  return (
    <div className={`${style.comments} ${customStyle?.comments}`}>
      <div className={style.commentsFormTitle}></div>
      <CommentForm /* submitLabel="Send" */ handleSubmit={addComment} imageID={imageID}/>
      <div className={style.commentsContainer}>
        {
          beackendCommentsFilter.map((val) => {
            return (
              <div key={val.id}>
                <Comment key={val.id}
                  comment={val}
                  replies={getReplies(val.id)} />
              </div>
            )
          })}
      </div>
    </div>
  )
}