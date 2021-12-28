import { historyService } from '../../services/playlist.service.js'


export function loadHistory(){
  return async dispatch => {
    const history = historyService.query()
    dispatch({type: 'SET_HISTORY', history})
  }
}

export function getByKey(key) {
    return async dispatch => {
        const res = await historyService.getByKey(key);
        dispatch({ type: `SET_${[key]}`, res })
      };
}

export function addSearch(search){
  return async dispatch =>{
    const newSearch = await historyService.addSearch(search);
    dispatch({ type: 'ADD_SEARCH', newSearch })
  }
}

export function addVisitedSong(song){
  return async dispatch =>{
    const newSong = await historyService.addSearch(song);
    dispatch({ type: 'ADD_VISITED_SONGS', newSong })
  }
}

export function clearHistory() {
    return async dispatch => {
        await historyService.clear()
        dispatch({ type: 'CLEAR_HISTORY' })
      };
}

