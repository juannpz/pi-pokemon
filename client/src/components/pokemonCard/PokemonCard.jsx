  /* eslint-disable react/prop-types */
  import styles from './PokemonCard.module.css'
  import { Link } from 'react-router-dom';

  const PokemonCard = ({pokemon}) => {

    const { name, api_types, img, api_id} = pokemon

    return (
      <div className={styles.card}>
        <Link className={styles.link} to={`/detail/${api_id}`}>
          <img src={img} alt={name} />
          <h3>{name.toUpperCase()}</h3>
          <div className={styles.typeContainer}>
            {api_types.map((type) => (
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

  export default PokemonCard;
