import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import { cleanPokemonByName } from '../../redux/actions';
import styles from './SearchBar.module.css'; // Importa los estilos CSS Modules

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    dispatch(getPokemonByName(searchValue));
  };

  const handleShowAllClick = () => {
    setSearchValue('');
    dispatch(cleanPokemonByName());
  };

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
  );
};

export default SearchBar;
