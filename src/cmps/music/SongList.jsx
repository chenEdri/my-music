import React from 'react'
import { SongPreview } from './SongPreview'
import { PlayPreview } from './PlayPreview'
import ReactLoading from 'react-loading';

function _SongList({ songs, index, isListView, onLoadSong }) {
  if (!songs) return <ReactLoading type={'cubes'} color='#a22b44' />
  console.log(songs);
  return (
    <ul className='playlist'>
      {isListView
        ? songs.map((song, idx) => (
            <li key={idx}>
              <SongPreview
                idx={index + idx}
                song={song}
                onLoadSong={onLoadSong}
              />
            </li>
          ))
        : songs.map((song, idx) => (
            <li key={song.id}>
              <PlayPreview song={song} onLoadSong={onLoadSong} />
            </li>
          ))}
    </ul>
  )
}

export const SongList = React.memo(_SongList)
