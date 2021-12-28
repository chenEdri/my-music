
import { songService } from './services/song.service'
import { userService } from './services/user.service'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import ScrollToTop from './cmps/ScrollToTop'
import {useState} from 'react'

function App() {
  const [isDark, setisDark] = useState(true)
  const toggleDarkMode = ()=>{ setisDark(!isDark)}
  
  const bgc = isDark? 'dark-bgc':'li-bgc'
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
