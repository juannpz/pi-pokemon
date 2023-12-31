import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/Landing'
import Home from './components/home/Home'
import styles from './App.module.css'
import PokemonDetail from './components/pokemonDetail/PokemonDetail'
import Form from './components/form/Form'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebarLeft}></div>
      <div className={styles.contentContainer}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pokemon/:id' element= {<PokemonDetail />}/>
          <Route path='/create' element= {<Form />}/>
        </Routes>
      </div>
      <div className={styles.sidebarRight}></div>
    </div>
  );
};

export default App
