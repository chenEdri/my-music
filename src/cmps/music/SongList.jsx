import React from 'react'
import {SongPreview}  from './SongPreview'
import {PlayPreview} from './PlayPreview'

function _SongList({ songs ,index, isListView} ) {
  if (!songs) return <div>nothing to show</div>
  return (
    <ul className="playlist">
      {isListView? songs.map((song, idx) => (
        <li key={song.id}>
          <SongPreview key={song.id} idx={index + idx} song={song}/>
        </li>)):
        songs.map((song, idx) => (
        <li key={song.id}>
          <PlayPreview key={song.id} idx={index + idx} song={song}/>
        </li>))}
    </ul>
  )
}

export const SongList = React.memo(_SongList)
