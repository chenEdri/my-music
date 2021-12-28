import { storageService } from './async-storage.service'
import { getObjectKey } from './util.service'

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
  history = { ...history, searchList: searchList.push(search) }
  return await storageService._save(STORAGE_KEY, history)
}

async function addVisitedSong(song) {
  let history = await storageService.query(STORAGE_KEY)
  history = { ...history, visitedSongs: visitedSongs.push(song) }
  return await storageService._save(STORAGE_KEY, history)
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
}
