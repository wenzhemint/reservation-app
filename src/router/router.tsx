import MainPage from '../pages/MainPage/MainPage'
import AboutPage from '../pages/AboutPage/AboutPage'

export const routerConfig = [
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/main",
        element: <MainPage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    }
]