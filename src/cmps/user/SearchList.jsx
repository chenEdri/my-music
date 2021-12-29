import React from 'react'
import { SearchPreview } from './SearchPreview.jsx'

export function SearchList({searches , onLoadSong}) {
  if (!searches) return <div>nothing to show</div>
  return (
    <ul className="searches">
      {searches.map((item, idx) => (
         <li key={idx}> 
         <SearchPreview
            key={idx}
            item={item}
            onLoadSong={onLoadSong}
          /></li>
      ))}
    </ul>
  )
}

