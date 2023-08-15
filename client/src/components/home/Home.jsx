/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PokemonCard from '../pokemonCard/PokemonCard';
import SearchBar from '../searchBar/SearchBar';
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getFilteredPokemons, cleanFilteredPokemons, getPokemonByName, getTypes } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const pokemonByName = useSelector((state) => state.pokemonByName)
  const filteredPokemons = useSelector((state) => state.filteredPokemons)
  const pokemons = useSelector((state) => state.pokemons)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(12)
  const [filterValue, setFilterValue] = useState(null)
  const [filterName, setFilterName] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const types = useSelector((state) => state.types)
  const [sorterValue, setSorterValue] = useState("")
  const [sorterName, setSorterName] = useState("")

  const handleSelectChangeSorter = (event) => {
    const selectedValue = event.target.value
    const selectedName = event.target.name
    setSorterValue(selectedValue)
    setSorterName(selectedName)
  }

  const sort = (pokemonsToSort) => {

    let sortedPokemons
    
  
    if (sorterName === 'a-z') {
      if (sorterValue === 'asc') {
        sortedPokemons = [...pokemonsToSort].sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sorterValue === 'desc') {
        sortedPokemons = [...pokemonsToSort].sort((a, b) => b.name.localeCompare(a.name));
      }
    }


    if (sorterName === 'atk') {
      if (sorterValue === 'asc') {
        sortedPokemons = [...pokemonsToSort].sort((a, b) => a.attack - b.attack)
      }
      if (sorterValue === 'desc') {
        sortedPokemons = [...pokemonsToSort].sort((a, b) => b.attack - a.attack)
      }
    }

    return sortedPokemons
  }

  const handleSearchClick = () => {
    dispatch(getPokemonByName(searchValue))
  }

    const handleSelectChangeFilter = (event) => {
        const selectedValue = event.target.value
        const usedFilter = event.target.name
        setFilterName(usedFilter)
        setFilterValue(selectedValue)
        setStart(1)
        setEnd(12)
        setCurrentPage(1)
    }

    const resetFilters = () => {
        setFilterValue(null)
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
    
    console.log(sorterValue)
    console.log(sorterName);

    if (types.length < 1) dispatch(getTypes())
    
    if (typeof filterValue === 'string') {
      dispatch(getFilteredPokemons(start-1, end-1, filterName, filterValue))
    } else {
      dispatch(getAllPokemons(start-1, end-1))
    }
    console.log(sort(pokemons));
    
  }, [dispatch, filterValue, currentPage, sorterValue])

  

  let pokemonsToRender = []
  pokemonsToRender = pokemons
  if (typeof pokemonByName === 'object' && pokemonByName.length > 0 && filterValue == null) {
    pokemonsToRender = pokemonByName
  } else if (filterValue !== null) {
    if (sorterName.length > 1) {
      pokemonsToRender = sort(filteredPokemons)
    }
  } else if (sorterName.length > 1) {
    console.log(sort(pokemons))
    pokemonsToRender = sort(pokemons)

  }

  // const pokemonsToRender = typeof pokemonByName === 'object' && pokemonByName.length > 0 && filterValue == null ? pokemonByName : filterValue !== null ? filteredPokemons : pokemons

  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchBar_createButton}>
      <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchClick={handleSearchClick}/>
          <button onClick={ () => navigate('/create')}>create</button>
      </div>

      {typeof pokemonByName !== 'object' || typeof pokemonByName === 'object' && pokemonByName.length < 1 && <div className={styles.filters_sorters}>
        <div className={styles.filters}>
            <select onChange={handleSelectChangeFilter} defaultValue="" name="origin">
                <option value="" disabled>Filter by origin</option>
                <option value="local">DB</option>
                <option value="api">API</option>
            </select>
            <select onChange={handleSelectChangeFilter} defaultValue="" name="type">
              <option value="" disabled>Filter by types</option>
                {types.map((type) => <option key={type} value={type}>{type}</option>
                )}
            </select>
            {filterValue && <button onClick={resetFilters}>reset filters</button>}
        </div>
        <div className={styles.sorters}>
            <select onChange={handleSelectChangeSorter} defaultValue="" name="a-z">
                <option value="" disabled>a-z</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            <select onChange={handleSelectChangeSorter} defaultValue="" name="atk">
                <option value="" disabled>atk</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
        </div>
      </div>}


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
  )
}

export default Home
