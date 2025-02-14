import { FC, useContext, useEffect, useState } from "react"
import styles from "./MainPage.module.scss"
import MenuComp from "../../components/MenuComp/MenuComp"
import ProgresComp from "../../components/ProgresComp/ProgresComp"
import BookingBlock from "../../components/BookingBlock/BookingBlock"
import { ThemeContext } from "../../context/themeContext"
import * as BookingApi from '../../services/bookings-api'
import { useDispatch } from "react-redux"
import { PAGE_THEME, NETWORK_ERROR, CURRENT_PROGRESS } from "../../utils/helpers/constants"
import * as bookingActions from "../../redux/booking/bookingSlice"

const MainPage: FC = () => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        console.log("main page mounted.")

        dispatch(bookingActions.updateCurrentProgres(CURRENT_PROGRESS.BOOK))
        fetchTables()
    }, [])

    const fetchTables = async () => {
        setLoading(true);
        await BookingApi.getAllTables()
        .then((res) => {
            console.log("== tablesList: ", res)
            dispatch(bookingActions.updateTables(res))
            setLoading(false)
            setError(false)
        })
        .catch((e) => {
            console.log("== error: ", e)
            if(e==NETWORK_ERROR) {
                console.log("== Network Error occured. ")
                setErrMessage(NETWORK_ERROR)
            }
            setLoading(false)
            setError(true)
        })
    }

    return (
        <>
            <div className={`container ${currentTheme==PAGE_THEME.DARK?'is-dark-mode':''}`}>
                <MenuComp />
                <div className={`${styles.mainPage}`}>
                    <ProgresComp />
                    <BookingBlock
                        loading={loading}
                        error={error}
                        errMessage={errMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default MainPage;