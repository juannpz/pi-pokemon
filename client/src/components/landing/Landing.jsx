import { useNavigate } from 'react-router-dom';
import AllData from '../../hooks/allData';
import { useEffect, useState } from 'react';
import styles from './Landing.module.css'

const Landing = () => {
  const navigate = useNavigate() 
  const {pokemons, types} = AllData()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemons.length > 1 && types.length > 1)setLoading(false)
  }, [pokemons, types])
  

  const handleGoToHomePage = () => {
    navigate('/home'); // Redirige a la página de inicio (Home)
  };

  return (
    <div className={`${styles.container} ${!loading && styles.showBackground}`}>
      {loading && <img className={styles.loadingImg} src='./src/assets/eevee_loading.gif'/>}
      {loading && <h1>LOADING</h1>}
      {!loading && <button className={styles.launchButton} onClick={handleGoToHomePage}>Ingresar</button>}
    </div>
  );
};

export default Landing;
