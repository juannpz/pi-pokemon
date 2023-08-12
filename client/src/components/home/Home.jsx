import PokemonCard from '../pokemonCard/PokemonCard';
import styles from './Home.module.css';
import SearchBar from '../searchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import { useEffect } from 'react';
import Pagination from '../pagination/Pagination';

const Home = () => {
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons(1, 12));
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchBar_filters_h1}>
        <SearchBar />
        {typeof pokemonByName === 'string' && <h1>Pokémon not found</h1>}
      </div>
      {!pokemonByName || (typeof pokemonByName === 'string') ? null : (
        <div className={styles.cardContainer}>
          {pokemonByName.length > 0
            ? pokemonByName.map((pokemon) => (
                <PokemonCard key={`${pokemon.api_id}-${pokemon.id}`} pokemon={pokemon} />
              ))
            : pokemons.map((pokemon) => (
                <PokemonCard key={`${pokemon.api_id}-${pokemon.id}`} pokemon={pokemon} />
              ))}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
