  /* eslint-disable react/prop-types */
  import styles from './PokemonCard.module.css'
  import { Link } from 'react-router-dom'

  const PokemonCard = ({pokemon}) => {

    const { name, type, img, api_id} = pokemon

    return (
      <div className={styles.card}>
        <Link className={styles.link} to={`/pokemon/${api_id}`}>
          <img src={img} alt={name} />
          <h3>{name.toUpperCase()}</h3>
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
