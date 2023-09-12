import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './style.module.css'
import { Comment } from '../Comment/Comment'
import { CommentForm } from '../CommentForm/CommentForm'

export const Comments = ({ imageID, customStyle, currentUserId }) => {
  const [beackendComments, setBackendComments] = useState([])
  const getCommentstUrl = "http://localhost:9000/comment"
  const [activeComment, setActiveComment] = useState(null)

  const rootComments = beackendComments.filter(
    (beackendComment) => beackendComment.parentId === null && beackendComment.imageID === imageID
  )

  const getReplies = commentId => {
    return beackendComments.filter(beackendComment => beackendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }

  const createComment =  (text, parentId = null) => {
    return{
      id: Math.random().toString(36).substr(2,9),
      body: text,
      parentId,
      imageID: imageID,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString()
    }
  } 

  const addComment = async (text, parentId) => {
    try {
      const newComment = createComment(text, parentId);
      const response = await axios.post(getCommentstUrl, newComment);
      setBackendComments([response.data, ...beackendComments]);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
 
  useEffect(() => {
    axios.get(getCommentstUrl)
      .then((res) => {
        setBackendComments(res.data)
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  return (
    <div className={`${style.comments} ${customStyle?.comments}`}>
      <div className={style.commentsFormTitle}>Write Comment</div>
      <CommentForm  submitLabel="Post" handleSubmit={addComment} imageID={imageID}/>
      <div className={style.commentsContainer}>
        {
          rootComments.map((rootComments) => {
            return (
              <div key={rootComments.id}>
                <Comment key={rootComments.id}
                  comment={rootComments}
                  replies={getReplies(rootComments.id)} 
                  currentUserId={currentUserId}
                  activeComment={activeComment }
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  />
              </div>
            )
          })}
      </div>
    </div>
  )
}


/* const createComment = async (text, parentId = null) => {
  try {
    const response = await axios.post('http://localhost:9000/comment', {
    id: Math.random().toString(36).substr(2,9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString()
    });
    console.log('Created comment:', response.data)
  } catch (error) {
    console.error('Error creating comment:', error)
  }
}

const addComment = async (text, parentId) => {
if (text.trim() === '') { 
  createComment(text, parentId)
    .then(comment => {
      setBackendComments([comment, ...beackendComments]);
    })
    .catch(error => {
      console.error("Error creating comment:", error);
    });
} else {
  console.error("Invalid text or parentId:", text, parentId);
}
}; */

 
 /*  const addComment = async (text, parentId) => {
    try {
      const comment = await createComment(text, parentId);
      setBackendComments([comment, ...beackendComments]);
      console.log("addComment", text, parentId);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }; */
  
