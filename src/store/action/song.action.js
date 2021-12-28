import { songService } from '../../services/song.service.js'

export function loadSongs(search) {
    return async dispatch => {
        const songs = await songService.query(search);
        console.log(songs);
        dispatch({ type: 'SET_SONGS', songs })
      };
}

export function loadSong(songId){
  console.log('songId', songId)
  return async dispatch =>{
    const song = await songService.getById(songId);
    dispatch({ type: 'SET_SONG', song })
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

export function saveSong(song) {
  const type = (song._id)? 'EDIT_SONG' : 'ADD_SONG';
  return async dispatch => {
      const savedSong = await songService.save(song);
        dispatch({ type , savedSong })
      };
}

export function setPage(page){
  return dispatch => {dispatch({ type: 'SET_PAGE', page})}
}

export function setView(isListView){
  console.log('here');
  return dispatch => {dispatch({ type: 'SET_VIEW', isListView})}
}
