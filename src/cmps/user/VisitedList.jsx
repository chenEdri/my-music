import React from 'react'
import { VisitedPreview } from './VisitedPreview'

export function VisitedList({ visitedSongs ,onLoadSong }) {
  if (!visitedSongs) return <div>nothing to show</div>
  return (
    <ul className='playlist'>
      {visitedSongs.map((song, idx) => (
        <li key={idx}>
          <VisitedPreview key={idx} song={song} onLoadSong={onLoadSong}/>
        </li>
      ))}
    </ul>
  )
}
