import PokemonById from '../../hooks/pokemonById'
import styles from './PokemonDetail.module.css'

const PokemonDetail = () => {

    const { api_types, name, attack, defense, hp, speed, img, weight, height } = PokemonById()

    return (
        <div className={styles.detailContainer}>
            <h2>{name}</h2>
            <div className={styles.typeContainer}>
                        {api_types && api_types.map((type) => (
                            <strong
                                className={styles[type]}
                                key={`${type}-${name}`}>
                                {type}
                            </strong>
                        ))}
                    </div>
            <div className={styles.dataContainer}>
                <img src={img} alt={name} />
                <div className={styles.statsContainer}>
                    <div className={styles.stats1}>
                        <span className={styles.label}>attack</span>
                        <span className={styles.value}>{attack}</span>
                        <span className={styles.label}>defense</span>
                        <span className={styles.value}>{defense}</span>
                        <span className={styles.label}>hp</span>
                        <span className={styles.value}>{hp}</span>  
                    </div>
                    <div className={styles.stats2}>
                        <span className={styles.label}>speed</span>
                        <span className={styles.value}>{speed}</span>
                        <span className={styles.label}>weight</span>
                        <span className={styles.value}>{weight}</span>
                        <span className={styles.label}>height</span>
                        <span className={styles.value}>{height}</span>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default PokemonDetail

