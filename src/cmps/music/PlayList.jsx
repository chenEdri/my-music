import React from 'react'
import { PlayPreview } from './PlayPreview.jsx'
function _PlayList(props) {
  const { playlists } = props
  if (!playlists) return <div>nothing to show</div>
  return (
    <ul className="playlist">
      {playlists.map((playlist) => (
         <li key={playlist.id}> <PlayPreview
            key={playlist.id}
            playlist={playlist}
            onDeletePlaylist={props.onDeletePlaylist}
          /></li>
      ))}
    </ul>
  )
}

export const PlayList = React.memo(_PlayList)
