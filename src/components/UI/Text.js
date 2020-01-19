import React from 'react'
import './UI.scss'

export default function Text(props) {
  const {children, color, fontSize} = props;
  return (
    <p className="text" style={{color, fontSize}}>
      {children}
    </p>
  )
}
