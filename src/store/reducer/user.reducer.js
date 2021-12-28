var localLoggedinUser = null
if (sessionStorage.loggedinUser)
  localLoggedinUser = JSON.parse(sessionStorage.loggedinUser || null)

const initialState = {
  users: [],
  loggedinUser: localLoggedinUser,
}

export function itemReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        loggedinUser: action.user,
        users: state.users.push(action.user),
      }
    case 'LOGIN':
      return {
        ...state,
        loggedinUser: action.user,
      }
    case 'LOGOUT':
      return {
        loggedinUser: null,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      }
    case 'SET_USER':
      return {
        ...state,
        loggedinUser: action.user,
      }
    case 'REMOVE_USER':
      return {
        ...state,
        items: state.users.filter((user) => user._id !== action.userId),
      }
    // case 'EDIT_USER':
    //   return {
    //     ...state,
    //     loggedinUser: action.savedUser,
    //     users: state.items.map((user) =>
    //       user._id === action.savedUser._id ? action.savedUser : user
    //     ),
    //   }
    // case 'ADD_USER':
    //   return {
    //     ...state,
    //     items: state.user.push(action.user),
    //   }
    default:
      return state
  }
}
