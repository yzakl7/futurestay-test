import React from 'react'
import './UI.scss'

export default function Text(props) {
  const {children, color} = props;
  return (
    <p className="text" style={{color}}>
      {children}
    </p>
  )
}
