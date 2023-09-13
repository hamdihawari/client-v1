import React, { useState } from 'react'
import style from './style.module.css'
import userperson from '../../../../assets/images/girlUser.png'
import { CommentForm } from '../CommentForm/CommentForm'
import { AddComment } from '@mui/icons-material'

export const Comment = ({ comment, replies, deleteComment, currentUserId, updateComment, activeComment, setActiveComment, addComment, parentId = null }) => {
  const fiveMinutes = 300000
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
  const canReply = Boolean(currentUserId) // Reply
  const canEdit = currentUserId === comment.userId && !timePassed
  const canDelete = currentUserId === comment.userId && !timePassed
  const createdAt = new Date(comment.createdAt).toLocaleDateString()
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
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

          {!isEditing && (<div className={style.commentText}>{comment.body}</div>)}

          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => setActiveComment(null)}
            />)}
          <div className={style.commentActions}>
            <div className={style.commentActionContent}>

              {canReply && (
                <div className={style.commentAction}
                  onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
                >
                  Reply
                </div>
              )}

              {canEdit && (
                <div className={style.commentAction}
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "editing" })}
                >
                  Edit
                </div>
              )}
              {canDelete && (
                <div className={style.commentAction}
                  onClick={() => {
                    deleteComment(comment.id)
                  }}>
                  Delete
                </div>
              )}
            </div>
          </div>

          {isReplying && (
            <CommentForm
              submitLabel="ReplyX"
              handleSubmit={(text) =>
                addComment(text, replyId)} />
          )}
          {replies.length > 0 && (
            <div className={style.replies}>
              {replies.map(reply => (
                <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}