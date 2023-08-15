import { useState, useEffect } from 'react';
import axios from 'axios';
import { getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css'

const CreatePokemonForm = () => {
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch()
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    img: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    types: '',
  })

  useEffect(() => {
    console.log(newPokemon)
    if (types.length < 1) dispatch(getTypes())
  }, [dispatch, types, newPokemon])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!newPokemon.types.length) {
      setErrors({ ...errors, types: 'Debes seleccionar al menos un tipo.' })
      return
    }

    try {
      const response = await axios.post("http://localhost:3001/pokemons", newPokemon)
      const data = response.data
      console.log(data)
      setNewPokemon({
        name: '',
        img: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
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
  };

  return (
        <form onSubmit={handleSubmit} className={styles.form}>
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
        
      
        
        {errors.types && <span className="error">{errors.types}</span>}
      
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
      <button type="submit">Crear Pokémon</button>
    </form>
    
  );
};

export default CreatePokemonForm

// new RegExp(/^(ftp|http|https)://[^ "]+$/)




// return (
//     <>
//       <div className={stl.avgwrapper}>
//         <h1 className={stl.h1}>Add your own videogame</h1>
//         <form className={stl.formarea} onSubmit={handleSubmit}>
//           <div className={stl.msgarea}>
//             <label>Description:</label>
//             <textarea
//               onChange={handleOnChange}
//               type="text"
//               name="description"
//               value={input.description}
//             />
//           </div>
//           <div className={stl.detailsarea}>
//             <label>Game Name:</label>
//             <input
//               onChange={handleOnChange}
//               onBlur={handleOnChange}
//               type="text"
//               name="name"
//               value={input.name}
//               autoComplete="off"
//             />
//             {errors.name && <p className={stl.error}> {errors.name} </p>}

//             <label>Image</label>
//             <input
//             onChange={handleOnChange}
//             type="text"
//             name='image'
//             value={input.image}
//             autoComplete="off" 
//             placeholder="URL"/>

//             <label>Released date:</label>
//             <input
//               onChange={handleOnChange}
//               type="date"
//               name="reldate"
//               value={input.reldate}
//               placeholder="YYYY-MM-DD"
//             />

//             <label>Rating:</label>
//             <input
//               onChange={handleOnChange}
//               onBlur={handleOnChange}
//               type="text"
//               name="rating"
//               value={input.rating}
//               autoComplete="off"
//               placeholder="ex 4.3"
//             />
//             {errors.rating && <p className={stl.error}> {errors.rating} </p>}

//             <label>Select Platforms:</label>
//             <div className={stl.checkboxContainer}>
//               {allplatforms.sort().map((p) => {
//                 return (
//                   <div key={p}>
//                     <input
//                       type="checkbox"
//                       value={p}
//                       onChange={handlePlatforms}
//                     />
//                     <label>{p}</label>
//                   </div>
//                 );
//               })}
//             </div>
//             <ul className="ul">
//               <li>{input.platform.map((p) => p + ' ,')}</li>
//             </ul>
//             {errors.platform && <p className={stl.error}> {errors.platform} </p>}

//             <label>Select Genres:</label>
//             {allgenres.sort().map((p) => {
//               return (
//                 <div key={p.id} className={stl.checkboxContainer}>
//                   <input
//                     type="checkbox"
//                     value={p.id}
//                     onChange={handleGenresChange}
//                   />
//                   <label>{p.name}</label>
//                 </div>
//               );
//             })}

//             <ul>
//               <li>{input.genre.map((p) => p + ' ,')}</li>
//             </ul>

//             <button className={stl.bot} type="submit">
//               Add Game
//             </button>
//             <span>
//               <Link to="/home">
//                 <button className={stl.bot2}>Back To Home</button>
//               </Link>{' '}
//             </span>
//           </div>
//         </form>
//       </div>
//       <div />
//     </>
//   );