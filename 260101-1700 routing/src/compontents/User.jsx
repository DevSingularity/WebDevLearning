import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
//   const { username } = useParams()
    const params=useParams();
  return (
    // <div>User : {username}</div>
    <div>User : {params.username}</div>
  )
}

export default User