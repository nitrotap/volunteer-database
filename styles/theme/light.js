import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0091d4',
            contrastText: '#fff',
        },
        secondary: {
            main: '#9a1717',
            contrastText: '#fff',
        },
    }
})

export default lightTheme;