const initalFilter = {
  title:'',
  owner: null,
  count: 10,
  page: 1
}

const initialState = {
  playlists: null,
  currPlaylist: null,
  filterBy: initalFilter,
  total: null,
}

export function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PL':
      const { playlists, page, total } = action.playlistObj
      return {
        ...state,
        playlists,
        page,
        total,
      }
    case 'SET_PL':
      return {
        ...state,
        currPlaylist: action.playlist,
      }
    case 'REMOVE_PL':
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist.id !== action.id
        ),
      }
    case 'EDIT_PL':
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist.id === action.savedPlaylist.id
            ? action.savedPlaylist
            : playlist
        ),
      }
    case 'ADD_PL':
      return {
        ...state,
        playlists: state.playlists.push(action.savedPlaylist),
      }
    case 'SET_FILTER':
      const { title, owner} = action.filterBy
      return {
        ...state,
        filterBy: {...state.filterBy, title, owner}
      }
      case 'SET_PAGE': return {
        ...state,
        filterBy: {...state.filterBy, page: action.page}
      }
    default:
      return state
  }
}
