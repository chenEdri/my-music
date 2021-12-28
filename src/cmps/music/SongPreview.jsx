import { Link } from 'react-router-dom'



export function SongPreview({ song, idx , onLoadSong}) {
  const { id, title , imgUrl } = song
  return (
    <article >
      <div className='song-pick-result flex' onClick={()=>{ onLoadSong(id)}}>
        <div className="idx">{idx + 1}</div>
          <img src={imgUrl} alt='#' />
        <div>{title}</div>
      </div>
    </article>
  )
}
