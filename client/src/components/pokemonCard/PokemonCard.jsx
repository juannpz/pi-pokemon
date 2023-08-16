/* eslint-disable no-unused-vars */
  /* eslint-disable react/prop-types */
  import styles from './PokemonCard.module.css'
  import { Link } from 'react-router-dom'

  const PokemonCard = ({pokemon}) => {

    const { id, name, type, img,} = pokemon

    return (
      <div className={styles.card}>
        <Link className={styles.link} to={`/pokemon/${id}`}>
          <img src={img} alt={name} />
          <h3>{name.toUpperCase()}</h3>
          <div className={styles.labelContainer}>
          </div>
          <div className={styles.typeContainer}>
            {type.map((type) => (
              <strong
                className={styles[type]}
                key={`${type}-${name}`}>
                {type}
              </strong>
            ))}
          </div>
        </Link>
    </div>
    )
  }

  export default PokemonCard
