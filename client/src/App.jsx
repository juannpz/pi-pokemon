import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/Landing';
import Home from './components/home/Home';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebarLeft}></div>
      <div className={styles.contentContainer}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      <div className={styles.sidebarRight}></div>
    </div>
  );
};

export default App;
