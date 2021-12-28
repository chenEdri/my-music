import React from 'react'
import { eventBusService } from '../../services/eventBus.service'

export function SongModal({ song }) {
  const imgUrl = song.snippet.thumbnails.standard.url

  const handleClick = (ev) => {
    ev.stopPropagation()
    eventBusService.emit('play-song', song)
  }
  return (
    <section className="relative">
      <div onClick={(ev) => handleClick(ev)}>
        <img
          src={
            imgUrl ||
            'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'
          }
        />
        {/* <div className="middle">
            <img src='./player-btn.png'/>
        </div> */}
      </div>
    </section>
  )
}
