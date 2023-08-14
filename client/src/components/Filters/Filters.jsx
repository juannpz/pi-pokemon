/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cleanFilteredPokemons, getFilteredPokemons } from "../../redux/actions"

const Filters = () => {
    const dispatch = useDispatch()
    //const [filterBy, setFilterBy] = useState("")
    const [value, setValue] = useState(null)

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value
        setValue(selectedValue)
        console.log(selectedValue);
    }

    const applyFilter = () => {
        dispatch(getFilteredPokemons(1, 12, "origin", value))
    }

    const resetFilters = () => {
        setValue(null)
        dispatch(cleanFilteredPokemons())
    }

    return (
        <div>
            <select onChange={handleSelectChange} defaultValue="" name="origin">
                <option value="" disabled>Select an option</option>
                <option value={true}>DB</option>
                <option value={false}>API</option>
            </select>
            {value && <button onClick={applyFilter}>apply filter</button>}
            {value && <button onClick={resetFilters}>reset filters</button>}
        </div>
    )
}

export default Filters