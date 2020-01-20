import React from 'react'
import './UI.scss'
import Text from './Text'

export default function Button({text, onClick, onClickParams, icon, fontSize, flexDirection}) {
  return (
    <button
      className="button"
      style={{flexDirection}}
      onClick={() => onClick(onClickParams)}
    >
      {icon && <div className="icon">{icon}</div>}
      {text && <Text fontSize={fontSize}>{text}</Text>}
    </button>
  )
}
