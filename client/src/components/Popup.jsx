import React from 'react'

const Popup = ({message,type}) => {
  return (
    <>
        <div className="pop_container">
            type ? (
                <label htmlFor="roomId">Enter Room Id:</label> 
                <input name='roomId' type={type} placeholder={message} />
            ):(
                <button>Create Room</button>
            )   
        </div>
    </>
  )
}

export default Popup