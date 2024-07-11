import { FC, createContext, useState } from 'react'
import { PAGE_THEME } from '../utils/helpers/constants'

export type ThemePropsType = {
    currentTheme: string;
    updateCurrentTheme: (newTheme: string) => void;
}

const contextDefaultValues: ThemePropsType = {
    currentTheme: PAGE_THEME.DARK,
    updateCurrentTheme: () => {}
};

export const ThemeContext = createContext<ThemePropsType>(contextDefaultValues);

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : contextDefaultValues.currentTheme
  });

  const updateCurrentTheme = (newTheme: string) => {
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme);
  }

  return (
    <ThemeContext.Provider 
        value={{
            currentTheme,
            updateCurrentTheme
        }}
    >
        {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
