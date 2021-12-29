
import {storageService} from './async-storage.service'
import { userService } from './user.service'
import {youtubeService} from './youtube.service'
import {getExclusiveArr} from './util.service'
const STORAGE_KEY = 'song'

export const songService = {
  query,
  getById,
  remove,
  save,
  updateList
  // createSongs
}

async function query(txt) {
  if(!txt.length) return
  let songs = await youtubeService.get(txt)
  await storageService.postMany(STORAGE_KEY, songs)
  return songs
}

async function getById(songId, isPlaying) {
  let song = await youtubeService.getSongById(songId)
  song = {...song.items[0], isPlaying}
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

async function updateList(songs){
  let newSongList = getExclusiveArr(songs)
  newSongList = _getOrganizedRes(newSongList)
  await storageService.postMany(STORAGE_KEY, newSongList)
  return newSongList
}


function _getOrganizedRes(songs){
  if(!songs[0].hasOwnProperty('snippet')) return songs
  return songs.map(song=>{
      const {id} = song;
      const {title, description,thumbnails} = song.snippet
      return{ 
          id: id.videoId,
          title:title,
          description,
          imgUrl: thumbnails.medium.url
      }   
  })
}


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

