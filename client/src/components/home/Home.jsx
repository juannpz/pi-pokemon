/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PokemonCard from '../pokemonCard/PokemonCard'
import styles from './Home.module.css'
import SearchBar from '../searchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons, getFilteredPokemons, cleanFilteredPokemons, getPokemonByName, getTypes } from '../../redux/actions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const pokemonByName = useSelector((state) => state.pokemonByName)
  const filteredPokemons = useSelector((state) => state.filteredPokemons)
  const pokemons = useSelector((state) => state.pokemons)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(12)
  const [value, setValue] = useState(null)
  const [filter, setFilter] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const types = useSelector((state) => state.types)

  const handleSearchClick = () => {
    dispatch(getPokemonByName(searchValue))
  };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value
        const usedFilter = event.target.name
        setFilter(usedFilter)
        setValue(selectedValue)
        setStart(1)
        setEnd(12)
        setCurrentPage(1)
    }
    const resetFilters = () => {
        setValue(null)
        dispatch(cleanFilteredPokemons())
        setStart(1)
        setEnd(12)
        setCurrentPage(1)
    }

    const handleClickNext = () => {
      setCurrentPage(currentPage + 1)
      setStart(start + 12)
      setEnd(end + 12)
  }

  const handleClickPrev = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
          setStart(start - 12)
          setEnd(end - 12)
      }
  }


  useEffect(() => {

    if (types.length < 1) dispatch(getTypes())
    
    if (typeof value === 'string') {
      console.log(currentPage, start, end, value)
      dispatch(getFilteredPokemons(start-1, end-1, filter, value))
    } else {
      dispatch(getAllPokemons(start-1, end-1))
    }
    
  }, [dispatch, value, currentPage]);

  const pokemonsToRender = typeof pokemonByName === 'object' && pokemonByName.length > 0 && value == null ? pokemonByName : value !== null ? filteredPokemons : pokemons;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchBar_filters_h1}>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchClick={handleSearchClick}/>
        <div className={styles.filters}>


        <div>
            <select onChange={handleSelectChange} defaultValue="" name="origin">
                <option value="" disabled>Filter by origin</option>
                <option value="local">DB</option>
                <option value="api">API</option>
            </select>
            <select onChange={handleSelectChange} defaultValue="" name="type">
                {types.map((type) => <option key={type} value={type}>{type}</option>
                )}
            </select>
            {value && <button onClick={resetFilters}>reset filters</button>}
            <button onClick={ () => navigate('/create')}>create</button>
        </div>


        </div>
        
      </div>


      {!pokemonByName || typeof pokemonByName === 'string' ? <h1>Pokémon not found</h1> : pokemonByName.length < 1 ? 
      <div className={styles.cardContainer}>
      {pokemonsToRender.map((pokemon) => (
      <PokemonCard key={`${pokemon.api_id}-${pokemon.id}`} pokemon={pokemon} />
    ))}
    </div> :
        <div className={styles.cardContainer}>
          {pokemonByName.map((pokemon) => (
          <PokemonCard key={`${pokemon.api_id}-${pokemon.id}`} pokemon={pokemon} />
        ))}
        </div>
      }


      {typeof pokemonByName === 'object' && pokemonByName.length < 1 &&
        <div className={styles.paginationContainer}>
          <button
            onClick={handleClickPrev}>
            prev
          </button>
          <label>{currentPage}</label>
          <button
            onClick={handleClickNext}>
            next
          </button>
        </div>
      }


    </div>
  );
};

export default Home
