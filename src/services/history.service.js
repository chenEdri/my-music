import { storageService } from './async-storage.service'
import { getObjectKey, updateObjByKey } from './util.service'

const STORAGE_KEY = 'history'

const defaultHistory = {
  searchList: [],
  visitedSongs: [],
  lastUserhistory: {
    page: 0,
    isListView: false,
    lastSearch: '',
    isDarkTheme: true,
  },
}
// check if there isn't history add default object to the storage service
if (!localStorage.history)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHistory))

async function loadHistory() {
  return await storageService.query(STORAGE_KEY)
}

async function getByKey(key) {
  key = getObjectKey(key)
  console.log('key-', key)
  let res = await storageService.query(STORAGE_KEY)
  return res[key]
}

async function addSearch(search) {
  let history = await storageService.query(STORAGE_KEY)
  const { searchList } = history
  history = { ...history, searchList: searchList.push(search) }
  return await storageService.putObj(STORAGE_KEY, 'searchList', history.search)
}

async function addVisitedSong(song) {
  let history = await storageService.query(STORAGE_KEY)
  const { visitedSongs } = history
  history = { ...history, visitedSongs: visitedSongs.push(song) }
  return await storageService.putObj(STORAGE_KEY, 'songs', history.songs)
}

async function saveUserHistory(key, val) {
  try {
    let history = await storageService.query(STORAGE_KEY)
    let { lastUserhistory } = history
    lastUserhistory = updateObjByKey(lastUserhistory, key, val)
    const changedHistory = await storageService.putObj(
      STORAGE_KEY,
      'lastUserhistory',
      lastUserhistory
    )
    return changedHistory
  } catch (err) {
    console.error(err)
  }
}

function clearHistory() {
  storageService.removeEntity(STORAGE_KEY)
}

export const historyService = {
  loadHistory,
  getByKey,
  addSearch,
  addVisitedSong,
  clearHistory,
  saveUserHistory,
}
