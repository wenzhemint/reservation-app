import { FC, useContext, useEffect } from "react"
import styles from "./AboutPage.module.scss"
import MenuComp from "../../components/MenuComp/MenuComp"
import { ThemeContext } from "../../context/themeContext"
import { PAGE_THEME } from "../../utils/helpers/constants"

const AboutPage: FC = () => {
    const { currentTheme } = useContext(ThemeContext)

    useEffect(() => {
        console.log("about page mounted.")
    }, [])
    
    return (
        <>
            <div className={`container ${currentTheme==PAGE_THEME.DARK?'is-dark-mode':''}`}>
                <MenuComp />
                <div className={`${styles.aboutPage}`}>
                    About Page
                </div>
            </div>
        </>
    );
};

export default AboutPage;