import {Link} from 'react-router-dom'

export function PlayPreview({song}) {
  const { id, title , imgUrl } = song
  return (
    <article className='play-preview'>
      <div>
        <img src={imgUrl || 'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'} alt=''/>
      </div>
      <p className="clr4"> {title}</p>
    </article>
  )
}
