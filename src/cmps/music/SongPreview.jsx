import { Link } from 'react-router-dom'

export function SongPreview({ song, idx }) {
  const { id, title , imgUrl } = song
  return (
    <article >
      <div className='song-pick-result flex'>
        <div className="idx">{idx + 1}</div>
          <img src={imgUrl} alt='#' />
        <div>{title}</div>
      </div>
    </article>
  )
}
