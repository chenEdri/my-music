// necessary core imports:
import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// components:
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import ScrollToTop from './cmps/ScrollToTop'
import { Player } from './pages/Player'

// functionality:
import routes from './router'
import { loadHistory, saveUserHistory } from './store/action/history.action'
import { eventBusService } from './services/eventBus.service'

function App() {
  const { lastUserhistory } = useSelector((state) => state.historyReducer)
  const { isDarkTheme } = lastUserhistory
  const [songToPlay, setSongToPlay] = useState(null)
  const dispatch = useDispatch()
  let removeEventBus;

  useEffect(() => {
    if (!lastUserhistory) dispatch(loadHistory())
    removeEventBus = eventBusService.on('play-song', (song) => {
      setSongToPlay(song)
    })
    return ()=> {removeEventBus = null}
  }, [lastUserhistory])

  const toggleDarkMode = () => {
    dispatch(
      saveUserHistory('SET_LAST_USER_HISTORY', 'isDarkTheme', !isDarkTheme)
    )
  }

  const bgc = isDarkTheme ? 'dark-bgc' : 'li-bgc'
  return (
    <div className={`App ${bgc}`}>
      <Router>
        <Header toggleDarkMode={toggleDarkMode} />
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
        <ScrollToTop />
      </Router>
      {songToPlay ? <Player song={songToPlay} /> : <Footer />}
    </div>
  )
}
export default App
