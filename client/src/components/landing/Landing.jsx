import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Landing.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getTypes } from '../../redux/actions';

const Landing = () => {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(true)
    const pokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch()
    
    useEffect(() => {
      if (typeof types === 'object' && types.length < 1) {
        // Obtener los tipos antes de los pokemons
        dispatch(getTypes())
          .then(() => {
            if (typeof pokemons === 'object' && pokemons.length < 1) {
              return dispatch(getAllPokemons(1, 12));
            }
          })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); // Manejar el estado incluso en caso de error
          });
      } else if (typeof pokemons === 'object' && pokemons.length < 1) {
        // Si los tipos ya se han cargado, cargar los pokemons
        dispatch(getAllPokemons(1, 12))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); // Manejar el estado incluso en caso de error
          });
      } else {
        setLoading(false);
      }
    }, [pokemons, dispatch, types]);


  return (
    <div className={`${styles.container} ${!loading && styles.showBackground}`}>
      {loading && <img className={styles.loadingImg} src='./src/assets/eevee_loading.gif'/>}
      {loading && <h1>LOADING</h1>}
      {!loading && <button className={styles.launchButton} onClick={() => navigate('/home')}>Ingresar</button>}
    </div>
  );
};

export default Landing
