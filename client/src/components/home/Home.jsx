/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PokemonCard from '../pokemonCard/PokemonCard';
import SearchBar from '../searchBar/SearchBar';
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getFilteredPokemons, cleanFilteredPokemons, getPokemonByName, getTypes, fillLastRendered } from '../../redux/actions';
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
  const [sorterValue, setSorterValue] = useState(null)
  const [sorterName, setSorterName] = useState("")
  const [pokemonsToRender, setPokemonsToRender] = useState([])

  
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
        sortedPokemons = [...pokemonsToSort].sort((a, b) => b.name.localeCompare(a.name))
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


    const resetSorter= () => {
        setSorterValue(null)

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
    
    if (typeof filterValue === 'string') {
      dispatch(getFilteredPokemons(start-1, end-1, filterName, filterValue))
    } else {
      dispatch(getAllPokemons(start-1, end-1))
    }
  
  }, [dispatch, filterValue, currentPage, sorterValue])


  useEffect(() => {

    setPokemonsToRender(pokemons)
    
    if (typeof pokemonByName === 'object' && pokemonByName.length > 0 && filterValue === null) {
      setPokemonsToRender(pokemonByName)
    } else if (filterValue !== null) {
      if (sorterValue !== null) {
        setPokemonsToRender(sort(filteredPokemons))
      }
    } else if (sorterValue !== null) {
      setPokemonsToRender(sort(pokemons))
    }

  }, [pokemons, pokemonByName, filteredPokemons, filterValue, sorterValue])


  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchBar_createButton}>
      <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchClick={handleSearchClick}/>
      </div>

      {typeof pokemonByName !== 'object' || typeof pokemonByName === 'object' && pokemonByName.length < 1 &&

      <div className={styles.filters_sorters}>
        <div className={styles.filters}>
            <select className={styles.select} onChange={handleSelectChangeFilter} defaultValue="" name="origin">
                <option value="" disabled>Filter by origin</option>Filter
                <option value="local">DB</option>
                <option value="api">API</option>
            </select>
            <select className={styles.select} onChange={handleSelectChangeFilter} defaultValue="" name="type">
              <option value="" disabled>Filter by types</option>
                {types.map((type) => <option key={type} value={type}>{type}</option>
                )}
            </select>
            {filterValue && <button onClick={resetFilters}>reset</button>}
        </div>
        <div className={styles.createButtonContainer}>
            <button className={styles.createButton} onClick={ () => navigate('/create')}>New pokémon</button>
          </div>
        <div className={styles.sorters}>
            <select className={styles.select} onChange={handleSelectChangeSorter} defaultValue="" name="a-z">
                <option value="" disabled>Order A-Z</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            <select className={styles.select} onChange={handleSelectChangeSorter} defaultValue="" name="atk">
                <option value="" disabled>Order by ATK</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            {sorterValue && <button onClick={resetSorter}>reset</button>}
        </div>
      </div>}
      
      {typeof pokemonByName === 'string' ? 
      <div className={styles.notFoundContainer}>
        <img className={styles.notFoundImg} src='./src/assets/pikachu.png' alt="sas" />
        <label className={styles.notFound}>Pokémon not found</label>
      </div> : pokemonByName.length < 1 ? 
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
          {currentPage > 1 && <button
            onClick={handleClickPrev}>
            prev
          </button>}
          <label>{currentPage}</label>
          {pokemonsToRender.length === 12 && <button
            onClick={handleClickNext}>
            next
          </button>}
        </div>
      }


    </div>
  )
}

export default Home


