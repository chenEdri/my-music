import { songService } from '../../services/song.service.js'
import {historyService} from '../../services/history.service'

export function loadSongs(search) {
    return async dispatch => {
        const songs = await songService.query(search);
        const searchList = {search , res: songs}
        await historyService.addSearch(searchList)
        dispatch({type: 'ADD_SEARCH', searchList})
        dispatch({ type: 'SET_SONGS', songs })
      };
}

export function loadSong(songId , isPlaying = false){
  return async dispatch =>{
    const song = await songService.getById(songId, isPlaying);
    await historyService.addVisitedSong(song)
    dispatch({ type: 'SET_SONG', song })
   if(!isPlaying) dispatch({type:'ADD_VISITED_SONGS', song})
  }
}

export function removeSong(songId) {
    return async dispatch => {
        await songService.remove(songId)
        dispatch({ type: 'REMOVE_SONG', songId })
      };
}

export function clearCurrSong(){
  return dispatch => {dispatch({ type: 'SET_SONG', song:null})}
}

export function updateSongList(songs) {
  return async dispatch => {
    songs = await songService.updateList(songs)
    dispatch({ type: 'SET_SONGS', songs})
  }
}

export function saveSong(song) {
  const type = (song.id)? 'EDIT_SONG' : 'ADD_SONG';
  return async dispatch => {
      const savedSong = await songService.save(song);
        dispatch({ type , savedSong })
      };
}

export function saveSongToPlay(song){
  return dispatch => {dispatch({ type: 'SET_SONG', song })}
}

export function setPage(page){
  return dispatch => {dispatch({ type: 'SET_PAGE', page})}
}

export function setView(isListView){
  return dispatch => {dispatch({ type: 'SET_VIEW', isListView})}
}


