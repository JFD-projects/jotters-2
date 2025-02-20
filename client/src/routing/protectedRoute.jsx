import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../store/authSlice'

const ProtectedRoute = ({component: Component, children, ...rest}) => {
  const isLoggedIn = useSelector(getIsLoggedIn())

  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to={{
          pathname: '/info',
          state: {
            from: props.location
          }
        }}/>
      }
      return Component ? <Component {...props} /> : children
    }}/>
  )
}

export default ProtectedRoute
