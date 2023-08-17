import { useState, useEffect } from 'react';
import axios from 'axios';
import { getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css'
import { useNavigate } from 'react-router-dom';

const CreatePokemonForm = () => {
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newPokemon, setNewPokemon] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    types: '',
  })

  useEffect(() => {
    // console.log(newPokemon)
    if (types.length < 1) dispatch(getTypes())
  }, [dispatch, types, newPokemon])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!newPokemon.types.length) {
      setErrors({ ...errors, types: 'Debes seleccionar al menos un tipo.' })
      return
    }

    if (errors.name === "") setErrors({
      ...errors,
      name: "name is required"
    })

    try {
      await axios.post("http://localhost:3001/pokemons", newPokemon)
      setNewPokemon({
        name: '',
        img: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
      })
      setErrors({
        name: '',
        types: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPokemon((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleTypeChange = (event) => {
    const typeValue = event.target.value
    const isChecked = event.target.checked
  
    if (isChecked) {
      if (newPokemon.types.length >= 3) {

        return
      }
  
      
      setNewPokemon((prevState) => ({
        ...prevState,
        types: [...prevState.types, typeValue],
      }))
    } else {
  
      setNewPokemon((prevState) => ({
        ...prevState,
        types: prevState.types.filter((type) => type !== typeValue),
      }))
    }
  
    setErrors({ ...errors, types: '' })
  }

  return (
        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.formContent}>
          <div className={styles.inputContainer}>
    
    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Name:
      </label>
      <input
          className={styles.input}
          type="text"
          name="name"
          value={newPokemon.name}
          onChange={handleInputChange}
      />
    </div>
    
    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Url image:
      </label>
      <input
          className={styles.input}
          type="text"
          name="img"
          value={newPokemon.img}
          onChange={handleInputChange}
      />
    </div>
    
    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Hp:
      </label>
      <input
          className={styles.input}
          type="text"
          name="hp"
          value={newPokemon.hp}
          onChange={handleInputChange}
        />
    </div>

    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Attack:
      </label>
      <input
          className={styles.input}
          type="text"
          name="attack"
          value={newPokemon.attack}
          onChange={handleInputChange}
        />
    </div>

    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Defense:
      </label>
      <input
          className={styles.input}
          type="text"
          name="defense"
          value={newPokemon.defense}
          onChange={handleInputChange}
      />
    </div>

    <div className={styles.pairContainer}>   
    <label className={styles.label}>
      Speed:
      </label>
      <input
          className={styles.input}
          type="text"
          name="speed"
          value={newPokemon.speed}
          onChange={handleInputChange}
        />
    </div>
    
    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Height:
      </label>
      <input
          className={styles.input}
          type="text"
          name="height"
          value={newPokemon.height}
          onChange={handleInputChange}
        />
    </div>
    
    <div className={styles.pairContainer}>
    <label className={styles.label}>
      Weight:
      </label>
      <input
          className={styles.input}
          type="text"
          name="weight"
          value={newPokemon.weight}
          onChange={handleInputChange}
        />
      </div>
    
        </div>
        <div className={styles.typesContainer}>
      <label className={styles.label}>
      Tipos:
      </label>    
        {types.map((type) =>
        <div className={styles.typelabelInput} key={type}>
          
          <input
          className={styles.typesInput}
          type="checkbox"
          name="types"
          value={type}
          checked={newPokemon.types.includes(type)}
          onChange={handleTypeChange}/>
          
          <label className={styles.label}>
          {type}
          </label>
        </div>
        )}
        
      </div>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.createButton} type="submit">Create pokémon</button>
            <button onClick={() => navigate('/home')} className={styles.homeButton}>Home</button>    
          </div>
          {errors.types && <span className={styles.error}>{errors.types}</span>}
          {errors.name && <span className={styles.error}>{errors.name}</span>}
            
    </form>
    
  )
}

export default CreatePokemonForm