/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPokemonById } from "../redux/actions"

const PokemonById = () => {
    const {id} = useParams()
    const pokemon = useSelector((state) => state.pokemonById)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getPokemonById(id))
    }, [id])

    return pokemon
    
}

export default PokemonById