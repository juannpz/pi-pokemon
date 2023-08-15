/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { cleanPokemonByName } from '../../redux/actions'
import styles from './SearchBar.module.css'

const SearchBar = ({searchValue, setSearchValue, handleSearchClick}) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShowAllClick = () => {
    setSearchValue('')
    dispatch(cleanPokemonByName())
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search pokémon by name"
        className={styles.searchInput}
      />
      <div className="buttons">
        <button onClick={handleSearchClick} className={styles.searchButton}>
          Search
        </button>
        <button onClick={handleShowAllClick} className={styles.showAllButton}>
          Show All
        </button>
      </div>
    </div>
  )
}

export default SearchBar
