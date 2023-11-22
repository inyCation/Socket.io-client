import React from 'react'
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from "react-icons/ai"



const Ham = ({isOpen}) => {
  return (
    <>
        {isOpen ? (
            <AiOutlineMenuFold />
        ) : (
            <AiOutlineMenuUnfold />
        )}
    </>
  )
}

export default Ham