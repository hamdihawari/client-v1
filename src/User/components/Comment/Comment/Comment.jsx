import React, { useState } from 'react'
import style from './style.module.css'
import userperson from '../../../../assets/images/girlUser.png'
import { CommentForm } from '../CommentForm/CommentForm'
import { AddComment } from '@mui/icons-material'

export const Comment = ({ comment, replies, currentUserId, activeComment, setActiveComment, addComment, parentId=null }) => {
  
  const canReply = Boolean(currentUserId) // Reply
  const createdAt = new Date(comment.createdAt).toLocaleDateString()
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
  const replyId = parentId ? parentId : comment.id
  return (
    <>
      <div className={style.comment}>
        <div className={style.commentImageContainer}>
          <img src={userperson} className={style.imageUser} />
        </div>
        <div className={style.commentRightPart}>
          <div className={style.commentsContent}>
            <p className={style.commentAuthor}>{comment.username}</p>
            <p className={style.commentcreatedAt}>{createdAt}</p>
          </div>
          <div className={style.commentText}>{comment.body}</div>
          <div className={style.commentActions}>
          {canReply && (
          <div className={style.commentActions}
          onClick={() => 
            setActiveComment({id: comment.id, type: "replying"})}>
              Reply
              </div>
              )}
          </div>
          {isReplying && (
            <CommentForm 
            submitLabel="Reply"
            handleSubmit={(text) => 
              addComment(text, replyId)}/>
          )}
          {replies.length > 0 && (
            <div className={style.replies}>
              {replies.map(reply => (
                <Comment 
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                parentId={comment.id}
                addComment={addComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}