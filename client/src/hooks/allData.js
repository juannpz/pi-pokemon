import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllPokemons } from "../redux/actions"

const AllData = () => {

    const pokemons = useSelector((state) => state.pokemons)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllPokemons(1, 12))
    }, [dispatch])

    return {
        pokemons,
    }
}

export default AllData