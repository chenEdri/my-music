import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '../cmps/music/Search'
import { ListPaginator } from '../cmps/ListPaginator'
import { getSongsToShow, getTotalPages } from '../services/util.service'
import { loadSongs, setPage , setView} from '../store/action/song.action'
import { SongList } from '../cmps/music/SongList'
import GridView from '@material-ui/icons/GridOnOutlined'
import ViewList from '@material-ui/icons/ListAlt'

function MainApp() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { songs, paginator, isListView } = useSelector((state) => state.songReducer)

  useEffect(() => {
    if (search.length) dispatch(loadSongs(search))
    // if (!userPreferences) dispatch(loadUserPreferences())
  }, [search])

  const onSetSearch = (search) => {
    setSearch(search)
  }

  const toggleListView = () => {
    dispatch(setView(!isListView))
  }

  const onSwitchPage = (pageNum) => {
    dispatch(setPage(pageNum))
  }

  const { page } = paginator
  const totalPages = getTotalPages(songs.length)
  const { index, songsToShow } = getSongsToShow(page, songs)
  const gridView = isListView ?'':'playlist-container'
  return (
    <section className='main-container'>
      <div>
        <h2 className='title'>Sound-Awsome!</h2>
        <Search onSetSearch={onSetSearch} />
        {songsToShow && songsToShow.length ? (
          <div>
            <div className={`${gridView}`}>
              <SongList
                songs={songsToShow}
                index={index}
                isListView={isListView}
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
        <button disabled={isListView} onClick={()=>toggleListView()}>
          <ViewList />
        </button>
        <button disabled={!isListView} onClick={()=>toggleListView()}>
          <GridView />
        </button>
      </div>
    </section>
  )
}

export default MainApp
