import React from 'react'

import "./header.css"

const Header = () => {
  return (
    <div className='header custom-scroll'>
      <div className='header_history'>
        <p>12</p>
        <p>12 + 123</p>
        <p>12 + 123 * 123</p>
        <p>12 + 123 * 123</p>
      </div>
      <br />
      <div className='header_expression custom-scroll'><p>12 + 123 </p></div>
      <p className='header_result'>123</p>
    </div>
  )
}

export default Header