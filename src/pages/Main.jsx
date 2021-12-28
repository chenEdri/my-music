// necessary core imports:
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//components:
import { ListPaginator } from '../cmps/ListPaginator'
import { Search } from '../cmps/music/Search'
import { SongList } from '../cmps/music/SongList'
import { SongModal } from '../cmps/music/SongModal'

//functionality:
import { saveUserHistory, addSearch } from '../store/action/history.action'
import {
  loadSongs,
  loadSong,
  setPage,
  setView,
  clearCurrSong,
} from '../store/action/song.action'
import { getSongsToShow, getTotalPages } from '../services/util.service'

//style imports:
import GridView from '@material-ui/icons/GridOnOutlined'
import ViewList from '@material-ui/icons/ListAlt'

function MainApp() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { songs, paginator, isListView, currSong } = useSelector(
    (state) => state.songReducer
  )

  useEffect(() => {
    if (search.length) {
      dispatch(loadSongs(search))
      dispatch(addSearch(search))
    }
  }, [search])

  const onSetSearch = (search) => {
    setSearch(search)
  }

  const toggleListView = () => {
    dispatch(
      saveUserHistory('SET_LAST_USER_HISTORY', 'isListView', !isListView)
    )
    dispatch(setView(!isListView))
  }

  const onSwitchPage = (pageNum) => {
    dispatch(setPage(pageNum))
  }

  const onLoadSong = (id) => {
    dispatch(loadSong(id))
  }

  const onCloseModal = (ev) => {
    dispatch(clearCurrSong())
  }

  const { page } = paginator
  const totalPages = getTotalPages(songs.length)
  const { index, songsToShow } = getSongsToShow(page, songs)
  const gridView = isListView ? '' : 'playlist-container'
  const fadeMain = currSong ? 'fade-out' : 'fade-in'
  const fadeModal = currSong ? 'fade-in' : 'fade-out'
  return (
    <section>
      <div className={`main-container ${fadeMain}`}>
        <div>
          <h2 className='title'>Sound-Awsome!</h2>
          {!currSong ?<Search onSetSearch={onSetSearch} />:''}
          {songsToShow && songsToShow.length ? (
            <div>
              <div className={`${gridView}`}>
                <SongList
                  songs={songsToShow}
                  index={index}
                  isListView={isListView}
                  onLoadSong={onLoadSong}
                />
              </div>
              <ListPaginator
                page={page}
                totalPages={totalPages}
                onSwitchPage={onSwitchPage}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='btn-group'>
          <button disabled={isListView} onClick={() => toggleListView()}>
            <ViewList />
          </button>
          <button disabled={!isListView} onClick={() => toggleListView()}>
            <GridView />
          </button>
        </div>
      </div>
      {currSong ? (
        <div
          className={`modal-container ${fadeModal}`}
          onClick={(ev) => onCloseModal(ev)}
        >
          <SongModal song={currSong} />
        </div>
      ) : (
        ''
      )}
    </section>
  )
}

export default MainApp
