export function SearchResPreview({ index , song , idx , onLoadSong}) {
  const { id, title , imgUrl } = song
  return (
    <article >
      <div className='song-result flex' onClick={()=>{onLoadSong(id, 'search', index)}}>
        <div className="idx">{idx + 1}</div>
          <img src={imgUrl} alt='#' />
        <div>{title}</div>
      </div>
    </article>
  )
}
