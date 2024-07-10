import React from 'react'
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
const CutButton = ({link,css}) => {
  return (
    <div className={`text-3xl ${css}`}>
    <Link to={`${link}`}>
    <MdCancel />
    </Link>
    </div>
  )
}

export default CutButton