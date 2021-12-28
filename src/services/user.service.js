import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    createUsers
}


async function createUsers() {
    localStorage.removeItem('user')
    await signup({
        fullname: "Admin Adminov",
        email: "admin@pop.com",
        imgUrl: "http://placehold.it/32x32",
        isAdmin: true,
        username: "admin",
        password: "1234"
    })

    await signup({
        fullname: "User Userov",
        email: "user@pop.com",
        imgUrl: "http://placehold.it/32x32",
        isAdmin: false,
        username: "userov",
        password: "1234"
    })
}


function getUsers() {
    return storageService.query('user')
}


function getById(userId) {
    return storageService.get('user', userId)
}


function remove(userId) {
    return storageService.remove('user', userId)
}


async function update(user) {
    return storageService.put('user', user)
}


async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    return _saveLocalUser(user)

}


async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.clear()
}


function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || '[]')
}

