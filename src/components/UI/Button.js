import React from 'react'
import './UI.scss'

export default function Button({text, onClick, onClickParams}) {
  return (
    <button
      className="button"
      onClick={() => onClick(onClickParams)}
    >{text}</button>
  )
}
