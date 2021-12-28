import { userService } from '../../services/user.service'
import { alertService } from '../../services/alert.service'

export function login(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred)
      dispatch({ type: 'SIGNIN', user })
      return user
    } catch (err) {
      console.log(err)
      alertService.error('Wrong username or password')
    }
  }
}

export function signup( userCred ) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred)
      dispatch({ type: 'SIGNUP', user })
      return user
    } catch (err) {
      console.log(err)
      alertService.error('Something went wrong. Please try again later')
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'LOGOUT', user: null })
    } catch (err) {
      console.log(err)
      alertService.error('Something went wrong. Please try again later')
    }
  }
}

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log(err)
      alertService.error('Something went wrong. Please try again later')
    }
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
      alertService.success('User removed successfully')
    } catch (err) {
      console.log(err)
      alertService.error('Something went wrong. Please try again later')
    }
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    try {
      user = await userService.update(user)
      dispatch({ type: 'SET_USER', user })
      alertService.success('User saved successfully')
    } catch (err) {
      console.log(err)
      alertService.error('Something went wrong. Please try again later')
    }
  }
}
