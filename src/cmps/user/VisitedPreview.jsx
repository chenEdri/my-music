//add functionality to move to the modal from here
export function VisitedPreview({song ,  onLoadSong}) {
    const { id, snippet } = song
    return (
      <article className='play-preview' onClick={()=>{ onLoadSong(id , 'visit')}}>
        <div>
          <img src={snippet.thumbnails.medium.url || 'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'} alt=''/>
        </div>
        <p className="clr4"> {snippet.title}</p>
      </article>
    )
  }
  