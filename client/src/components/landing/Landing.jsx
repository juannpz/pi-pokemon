import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Landing.module.css'
import AllData from '../../hooks/allData'
import { useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';

const Landing = () => {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(true)
    const {pokemons} = AllData()
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPokemons(1, 12))
    typeof pokemons === 'object' && pokemons.length > 1 && setLoading(false)
  }, [pokemons, dispatch])


  return (
    <div className={`${styles.container} ${!loading && styles.showBackground}`}>
      {loading && <img className={styles.loadingImg} src='./src/assets/eevee_loading.gif'/>}
      {loading && <h1>LOADING</h1>}
      {!loading && <button className={styles.launchButton} onClick={() => navigate('/home')}>Ingresar</button>}
    </div>
  );
};

export default Landing
