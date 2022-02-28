import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsList, getLoadingStatus, loadComments } from '../../../store/commentSlice'
import Spinner from '../../common/spinner'

const Comments = ({noteId}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoadingStatus())
  const comments = useSelector(getCommentsList())

  useEffect(() => {
    dispatch(loadComments(noteId))
  }, [])

  if (isLoading) {
    return <Spinner/>
  }

  if (!comments || comments.length === 0) {
    return <p>No comments</p>
  }

  return (
    <div className="comments">
      {comments.map(c => (
        <article key={c._id} className="comment">
          <div className="comment__header">
            <img className="comment__image"
                 src={c.userImage}
                 alt="User"/>
            <span className="comment__name">
              {c.userName}
            </span>
            <span className="comment__date">
              {c.createdAt}
            </span>
          </div>
          <p className="comment__context">
            {c.content}
          </p>
        </article>
      ))}
    </div>
  )
}

export default Comments
