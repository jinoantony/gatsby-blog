import React, { Component } from 'react'

const defaults = {
    theme: 'light',
    toggleTheme: () => {}
}

const ThemeContext = React.createContext(defaults)

class ThemeProvider extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isDark: false,
            isFound: false
        }
    }

    toggle () {
        this.setState(prevState => ({ isDark: !prevState.isDark}))
    }

    render() {
        const { isDark } = this.state

        return (
            <ThemeContext.Provider 
                value={{theme:isDark ? 'dark' : 'light', toggleTheme: this.toggle}}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContext
export { ThemeProvider }