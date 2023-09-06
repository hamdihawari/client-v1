import React from 'react'
import style from './style.module.css'
import userperson from '../../../../assets/images/girlUser.png'

export const Comment = ({ comment, replies }) => {
  return (
    <>
      <div className={style.comment}>
        <div className={style.commentImageContainer}>
          <img src={userperson} className={style.imageUser} />
        </div>
        <div className={style.commentRightPart}>
          <div className={style.commentsContent}>
            <p className={style.commentAuthor}>{comment.username}</p>
            <p className={style.commentcreatedAt}>{comment.createdAt}</p>
          </div>
          <div className={style.commentText}>{comment.body}</div>
          {replies.length > 0 && (
            <div className={style.replies}>
              {replies.map(reply => (
                <Comment comment={reply} key={reply.id} replies={[]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>

  )
}