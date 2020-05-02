import React from 'react'
import useDarkMode from 'use-dark-mode'
import moon from './moon.svg'
import sun from './sun.svg'

const ThemeToggler = (props) => {
    const darkMode = useDarkMode(false, {classNameDark: 'dark', classNameLight: 'light'})

    return (
        <button onClick={darkMode.toggle} id="theme-toggler">
            <img 
                src={darkMode.value ? sun : moon} 
                style={{marginTop: darkMode.value ? '0px' : '-7px' }} 
            />
        </button>
    )
}

export default ThemeToggler