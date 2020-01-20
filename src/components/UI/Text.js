import React from 'react'
import './UI.scss'

export default function Text(props) {
  const {children, color, fontSize, fontWeight, style} = props;
  return (
    <p className="text" style={{color, fontSize, fontWeight, ...style}}>
      {children}
    </p>
  )
}
