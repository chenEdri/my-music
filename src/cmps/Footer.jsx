import React from 'react'

export function Footer() {
  return (
    <div className='footer bgc-dark'>
      <div className='footer-container'>
        <div className='foot-col'>
          <p>TECHNOLOGY</p>
          <p>React Hooks</p>
          <p>Redux</p>
          <p>Web Api</p>
        </div>

        <div className='foot-col'>
          <p>Contact Info</p>
          <div className='mb10'>
            <a className='foot-hover mb10' href='mailto:chenedri22@gmail.com'>
              chenedri22@gmail.com
            </a>
          </div>
          <a
            href='https://www.linkedin.com/in/chen-edri-46290776/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        </div>
        <div className='foot-col'>
            <p>About Me</p>
          <div>
            <a
              href='https://www.linkedin.com/in/chen-edri-46290776/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Chen Edri
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
