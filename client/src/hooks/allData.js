import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllPokemons, getTypes } from "../redux/actions"

const AllData = () => {

    const pokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getTypes())

    }, [dispatch])

    return {
        pokemons,
        types,
    }
}

export default AllData