import Home from './pages/Home'
import Main from './pages/Main'
import PlaylistDetails from './pages/PlaylistDetails'
export default [
    {
        path: '/',
        component: Home,
        name: 'Home Page'
    },
    {
        path: '/main',
        component: Main,
        name: 'Main Page'
    },
    {
        path: '/playlist/:id',
        component: PlaylistDetails,
        name: 'Main Page'
    }
]