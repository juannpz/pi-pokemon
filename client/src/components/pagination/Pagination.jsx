import styles from './Pagination.module.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getAllPokemons } from "../../redux/actions"
import { useEffect } from "react"

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [start, setStart] = useState(1)
    const [end, setEnd] = useState(12)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAllPokemons(start, end))
    }, [dispatch, currentPage, start, end])
    

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1)
        setStart(start + 12)
        setEnd(end + 12)
    }

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setStart(start - 12)
            setEnd(end - 12)
        }
    }

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={handleClickPrev}>
                prev
            </button>

            <label>{currentPage}</label>

            <button
                
                onClick={handleClickNext}>
                next
            </button>
        </div>
    )
}

export default Pagination