import React from 'react'
import { eventBusService } from '../../services/eventBus.service'

export function SongModal({ song }) {
  console.log(song);
  const imgUrl =(song)? song.snippet.thumbnails?.standard?.url :'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'

  const handleClick = (ev) => {
    ev.stopPropagation()
    if(song.isPlaying) return
    eventBusService.emit('play-song', song)
  }
  if(!song) return<div>isLoading</div>
  return (
    <section className="relative">
      <div onClick={(ev) => handleClick(ev)}>
        <img
          src={
            imgUrl 
          }
        />
        {/* <div className="middle">
            <img src='./player-btn.png'/>
        </div> */}
      </div>
    </section>
  )
}
