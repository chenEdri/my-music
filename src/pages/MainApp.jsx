import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayList } from '../cmps/music/PlayList'
import { Search } from '../cmps/music/Search'
import { ListPaginator } from '../cmps/ListPaginator'
import {
  loadPlaylists,
  removePlaylist,
  setFilter,
  setPage,
} from '../store/action/playlist.action'
import { getTotalPages } from '../services/util.service'

function MainApp() {
  const { playlists, filterBy, total } = useSelector(
    (state) => state.playlistReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPlaylists(filterBy))
  }, [filterBy])

  // This is how we preserve the function reference between renders
  const onDeletePlaylist = useCallback(
    (id) => dispatch(removePlaylist(id)),
    // Dependency array, when to recreate the function? here its pointless.
    [removePlaylist, dispatch]
  )

  const onSwitchPage = (pageNum) => {
    dispatch(setPage(pageNum))
  }

  const onSetFilter = (filterBy) => dispatch(setFilter(filterBy))

  const { page } = filterBy
  const totalPages = getTotalPages(total, filterBy.counter)
  if (!playlists) return <div>isLoading</div>
  return (
    <section className='main-container bgc-dark'>
      <h2 className='title'>My-Playlists</h2>
      <p className='total'>Total: {total}</p>
      <div className='flex sb'>
        <Search onSetFilter={onSetFilter} />
        <ListPaginator
          page={page}
          totalPages={totalPages}
          onSwitchPage={onSwitchPage}
        />
      </div>
      <PlayList playlists={playlists} onDeletePlaylist={onDeletePlaylist} />
    </section>
  )
}

export default MainApp
