// import httpService from './http.service'
import {storageService} from './async-storage.service'
import { userService } from './user.service'

// initialize items
import { playlist } from '../JSONs/playlists'
import { albums } from '../JSONs/albums'

const STORAGE_KEY = 'playlist'

createItems()
function createItems() {
  if(!localStorage.playlist) localStorage.setItem('playlist', JSON.stringify(playlist))
  if(!localStorage.albums) localStorage.setItem('albums', JSON.stringify(albums))
}

export const playlistService = {
  query,
  getById,
  remove,
  save,
  createItems
}

async function query(filterBy = {}) {
  //return httpService.get(`playlist/`);
  let playlists = await storageService.query('playlist')
  const playlistsObj = _filterItems(playlists, filterBy)
  return playlistsObj
}

async function getById(id) {
    //return httpService.get(`playlist/${id}`, id)
  const playlist = await storageService.get(STORAGE_KEY, id)
  return playlist
}

async function remove(id) {
  // return httpService.delete(`playlist/${id}`)
  return storageService.remove(STORAGE_KEY, id)
}

async function save(playlist) {
  //   return playlist.id
  //     ? httpService.put(`playlist/${playlist.id}`, playlist)
  //     : httpService.post(STORAGE_KEY, playlist)
  let addedPlaylist
  try {
    if (playlist.id) {
        addedPlaylist = await storageService.put(STORAGE_KEY, playlist)
    } else {
        playlist.createdAt = Date.now()
        addedPlaylist = await storageService.post('playlist', playlist)
        // addedPlaylist = await httpService.post(`job`, job)
    }
    return addedPlaylist
  } catch (errs) {
    const errMap = {}
    errs.forEach((currErr) => (errMap[currErr.field] = currErr.msg))
    return Promise.reject(errMap)
  }
}

function _filterItems(playlists, filterBy) {
  const count = filterBy.count ? +filterBy.count : 12
  let index = filterBy.page ? (filterBy.page - 1) * count : 0
  let page = filterBy.page ? filterBy.page : 1
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, 'i')
    playlists = playlists.filter(
      (playlist) => regex.test(playlist.name)
    )
  }
  if(filterBy.owner){
    const regex = new RegExp(filterBy.owner, 'i')
    playlists = playlists.filter(playlist=> regex.test(playlist.owner.display_name))
  }
 
  // playlists.sort((a, b) => a.createdAt - b.createdAt)
  return { playlists: playlists.slice(index, index + count), total: playlists.length, page }
}

// function _validateItem(playlist) {
//   const errs = []
//   if (!playlist.title) {
//     errs.push({ msg: 'Please enter a title', field: 'title' })
//   }
//   if (!playlist.desc) {
//     errs.push({ msg: 'Please enter a description', field: 'desc' })
//   }
//   if (errs.length) throw errs
// }

