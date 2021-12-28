import React, { useEffect, useState, useReducer, useRef, useCallback } from 'react'


export const Search = ({ onSetSearch }) => {
  const inputRef = useRef(null)
  const [txtInput,setTxtInput] = useState('')
  
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const handleChange =((ev) => {
    ev.preventDefault()
    setTxtInput(ev.target.value)
  })
  
  const onSubmitForm = (ev) => {
    ev.preventDefault()
    onSetSearch(txtInput)
    setTxtInput('')
    inputRef.current.value = '';
  }

  return (
    <form autoComplete='off'>
      <label htmlFor=''>Search for Music</label>
      <div>
        <input 
          ref={inputRef}
          type='text'
          placeholder='Search music'
          onChange={handleChange}
        />
        <button className="search" onClick={onSubmitForm}>Search</button>
      </div>
    </form>
  )
}
