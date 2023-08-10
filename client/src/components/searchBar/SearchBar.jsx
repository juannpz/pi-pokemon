import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importa el hook useDispatch
import { getPokemonByName } from '../../redux/actions';
import { cleanPokemonByName } from '../../redux/actions';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search pokémon by name"
      />
      <button onClick={() => dispatch(getPokemonByName(searchValue))}>Search</button>
      <button onClick={() => dispatch(cleanPokemonByName())}>Show all</button>
    </div>
  );
};

export default SearchBar;
