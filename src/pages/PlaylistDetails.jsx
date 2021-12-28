import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadPlaylist } from '../store/action/playlist.action'
import MoreVert from '@material-ui/icons/MoreVert'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

function PlaylistDetails({ match, history, ...restOfProps }) {
  const playlist = useSelector((state) => state.playlistReducer.currPlaylist)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params
    if (id) dispatch(loadPlaylist(id))
    console.log(playlist)
  }, [match.params])

  const toggleBtn = () => {
    setIsOpen(!isOpen)
  }

  const onDeletePlaylist = (id) =>{
    console.log(id);
  }

  if (!playlist) return <div>no match found</div>
  const { id, name, description, owner, images, tracks } = playlist
  const bgc = isOpen? 'more':''
  return (
    <div className='main-container play-details bgc-dark flex start'>
      <h2 className='title'>{name}</h2>
      <img
        src={
          images[0]?.url ||
          'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'
        }
        alt=''
      />
      <section className='flex sb'>
        <div>
          <h4 className='big'>Description:</h4>
          <p>{description}</p>
        </div>
        <div className={`flex column wrap info `}>
          {' '}
          <h4 onClick={() => toggleBtn()} className={`cp ${bgc}`}>
            <MoreVert />
          </h4>
          {isOpen ? (
            <div className="info-btns">
              {' '}
              <h5 onClick={() =>onDeletePlaylist(id)}><Delete/></h5>
              <h5><Edit/></h5>
            </div>
          ) : (
            ''
          )}
        </div>
      </section>
      <section>
        <h4>Owner:</h4>
        <p>{owner.display_name}</p>
      </section>
      <section>
        <h4>Number of Tracks:</h4>
        <p>{tracks.total}</p>
      </section>
    </div>
  )
}
export default PlaylistDetails
