import { useState } from 'react'
import { SearchResPreview } from './SearchResPreview'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

export function SearchPreview({ index, item, onLoadSong }) {
  const [isOpenRes, setIsOpenRes] = useState(false)
  const toggleRes = () => setIsOpenRes(!isOpenRes)
  if (!item || !item.search || !item.res) return <div>is Loading...</div>
  const { search, res } = item
  const isHover = isOpenRes ? 'no-hover' : ''
  return (
    <div
      className={`search-res-container flex column ${isHover}`}
      onClick={() => toggleRes()}
    >
      <div className='flex sb'>
        <div className='idx'>{search}</div>
        <div className='arrow'>
          {isOpenRes ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
      </div>
      {isOpenRes ? (
        <ul>
          {res.map((song, idx) => (
            <li key={idx}>
              <SearchResPreview
                index={index}
                idx={idx}
                song={song}
                onLoadSong={onLoadSong}
              />
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
