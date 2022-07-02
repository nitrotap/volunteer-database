import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#00bcd4',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ff9800',
            contrastText: '#fff',
        },
    }
})

export default lightTheme;