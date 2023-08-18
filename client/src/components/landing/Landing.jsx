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
      if (typeof types === 'object' && pokemons.length < 1) dispatch(getTypes())
      if (typeof pokemons === 'object' && pokemons.length < 1) dispatch(getAllPokemons(1, 12))
      typeof pokemons === 'object' && pokemons.length > 1 && setLoading(false)
  }, [pokemons, dispatch, types])


  return (
    <div className={`${styles.container} ${!loading && styles.showBackground}`}>
      {loading && <img className={styles.loadingImg} src='./src/assets/eevee_loading.gif'/>}
      {loading && <h1>LOADING</h1>}
      {!loading && <button className={styles.launchButton} onClick={() => navigate('/home')}>Ingresar</button>}
    </div>
  );
};

export default Landing
