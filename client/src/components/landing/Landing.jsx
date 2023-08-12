import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Landing.module.css'
import AllData from '../../hooks/allData'

const Landing = () => {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(true);
    const {pokemons} = AllData()

  useEffect(() => {
    if (pokemons.length > 1) setLoading(false)
  }, [pokemons])


  return (
    <div className={`${styles.container} ${!loading && styles.showBackground}`}>
      {loading && <img className={styles.loadingImg} src='./src/assets/eevee_loading.gif'/>}
      {loading && <h1>LOADING</h1>}
      {!loading && <button className={styles.launchButton} onClick={() => navigate('/home')}>Ingresar</button>}
    </div>
  );
};

export default Landing
