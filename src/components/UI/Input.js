import React from 'react'
import './UI.scss'

const renderOptions = (options) => {
  return options.map((opt) => {
    return <option key={opt} value={opt}>{opt}</option>
  })
}
const renderSelect = ({onChange, value, options, stateName}) => {
  return (
    <select value={value} onChange={(e) => onChange(stateName, e.target.value)}>
      <option value=""></option>
      {renderOptions(options)}
    </select>
  )
}
const renderInputDefault = ({
  stateName,
  value,
  onChange,
  maxChars,
  type
}) => {
  return (
    <input
      maxLength={maxChars}
      value={value}
      type={type}
      className={type !== 'color' && 'input'}
      onChange={(e) => onChange(stateName, e.target.value)}
    />
  )
} 
export default function Input(props) {
  const { type } = props;
  if ( type === 'select') return renderSelect(props);
  return renderInputDefault(props)
}
