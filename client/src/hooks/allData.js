import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllPokemons, getTypes } from "../redux/actions"

const AllData = () => {

    const pokemons = useSelector((state) => state.pokemons)
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    
    useEffect(() => {
        dispatch(getAllPokemons(1, 12))
        dispatch(getTypes())
    }, [dispatch])

    return {
        pokemons,
        types,
    }
}

export default AllData