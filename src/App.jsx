
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import ScrollToTop from './cmps/ScrollToTop'
import {useEffect} from 'react'
import {loadHistory, saveUserHistory} from './store/action/history.action'
import {useDispatch , useSelector} from 'react-redux'

function App() {
  const {lastUserhistory} = useSelector(state => state.historyReducer)
  const {isDarkTheme} = lastUserhistory
  const dispatch = useDispatch()

  useEffect(() => {
    if(!lastUserhistory) dispatch(loadHistory())}
    ,[lastUserhistory])

  const toggleDarkMode = ()=>{ 
    dispatch(saveUserHistory('SET_LAST_USER_HISTORY', 'isDarkTheme', !isDarkTheme))
  }
  
  const bgc = isDarkTheme? 'dark-bgc':'li-bgc'
  return (
    <div className={`App ${bgc}`}>
      <Router>
        <Header toggleDarkMode={toggleDarkMode}/>
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
      <Footer />
    </div>
  )
}
export default App
