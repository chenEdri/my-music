
import {storageService} from './async-storage.service'
import { userService } from './user.service'
import {youtubeService} from './youtube.service'

const STORAGE_KEY = 'song'

export const songService = {
  query,
  getById,
  remove,
  save,
  // createSongs
}

async function query(txt) {
  if(!txt.length) return
  let songs = await youtubeService.get(txt)
  console.log('songs-', songs);
  // songs = _filterSongs(songs)
  return songs
}

async function getById(songId) {
  const song = await storageService.get(STORAGE_KEY, songId)
  return song
}

async function remove(songId) {
  return storageService.remove(STORAGE_KEY, songId)
}

async function save(song) {
  
  let addedSong
  try {
    _validateSong(song)
    if (song._id) {
      addedSong = await storageService.put(STORAGE_KEY, song)
    } else {
      song.ownerId = userService.getLoggedinUser()._id
      song.createdAt = Date.now()
      addedSong = await storageService.post(STORAGE_KEY, song)
      console.log(addedSong)
    }
    return addedSong
  } catch (errs) {
    const errMap = {}
    errs.forEach((currErr) => (errMap[currErr.field] = currErr.msg))
    return Promise.reject(errMap)
  }
}

// function _filterSongs(playlists, filterBy) {
//   const count = filterBy.count ? +filterBy.count : 12
//   let index = filterBy.page ? (filterBy.page - 1) * count : 0
//   let page = filterBy.page ? filterBy.page : 1
//   if (filterBy.title) {
//     const regex = new RegExp(filterBy.title, 'i')
//     playlists = playlists.filter(
//       (playlist) => regex.test(playlist.name)
//     )
//   }
//   if(filterBy.owner){
//     const regex = new RegExp(filterBy.owner, 'i')
//     playlists = playlists.filter(playlist=> regex.test(playlist.owner.display_name))
//   }
 
//   // playlists.sort((a, b) => a.createdAt - b.createdAt)
//   return { playlists: playlists.slice(index, index + count), total: playlists.length, page }
// }

function _validateSong(song) {
  const errs = []
  if (!song.title) {
    errs.push({ msg: 'Please enter a title', field: 'title' })
  }
  if (!song.desc) {
    errs.push({ msg: 'Please enter a description', field: 'desc' })
  }
  if (errs.length) throw errs
}

