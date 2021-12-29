import { useState } from 'react'
import { SearchResPreview } from './SearchResPreview'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

export function SearchPreview({ item, onLoadSong }) {
  const [isOpenRes, setIsOpenRes] = useState(false)
  const { search, res } = item
  const toggleRes = () => setIsOpenRes(!isOpenRes)
  const isHover = isOpenRes? 'no-hover' : ''
  return (
    <div
      className={`search-res-container flex column ${isHover}`}
      onClick={() => toggleRes()}
    >
      <div className="flex sb">
        <div className='idx'>{search}</div>
        <div className='arrow'>
          {isOpenRes ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
      </div>
      {isOpenRes ? (
        <ul >
          {res.map((song, idx) => (
            <li key={idx} >
              <SearchResPreview
                key={idx}
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
