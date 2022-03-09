import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsList, getLoadingStatus, loadComments } from '../../../../store/commentSlice'
import Spinner from '../../../common/spinner'
import Comment from "./comment";

const Comments = ({note}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoadingStatus())
  const comments = useSelector(getCommentsList())

  useEffect(() => {
    dispatch(loadComments(note._id))
  }, [])

  if (isLoading) {
    return <Spinner/>
  }

  if (!comments || comments.length === 0) {
    return <p>No comments</p>
  }

  return (
    <div className="comments">
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} note={note}/>
      ))}
    </div>
  )
}

export default Comments
