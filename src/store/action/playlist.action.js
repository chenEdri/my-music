import { playlistService } from '../../services/playlist.service.js'

export function loadPlaylists(filterBy = {}) {
    return async dispatch => {
        const playlistObj = await playlistService.query(filterBy);
        dispatch({ type: 'SET_PLS', playlistObj })
      };
}

export function loadPlaylist(id){
  return async dispatch =>{
    const playlist = await playlistService.getById(id);
    dispatch({ type: 'SET_PL', playlist })
  }
}

export function removePlaylist(id) {
    return async dispatch => {
        await playlistService.remove(id)
        dispatch({ type: 'REMOVE_PL', id })
      };
}

export function savePlatlist(playlist) {
  const type = (playlist.id)? 'EDIT_PL' : 'ADD_PL';
  return async dispatch => {
      const savedPlaylist = await playlistService.save(playlist);
        dispatch({ type , savedPlaylist })
      };
}

export function setFilter(filterBy){
  return (dispatch) => dispatch({type:'SET_FILTER',filterBy})
}

export function setPage(page){
  return (dispatch) => dispatch({type:'SET_PAGE', page})
}
