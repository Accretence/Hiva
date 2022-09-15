import 'styles/global.css'

import { ThemeProvider } from 'next-themes'
import Container from 'components/Container'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <ThemeProvider attribute="class">
            <Container>
                <Component {...pageProps} />
            </Container>
        </ThemeProvider>
    )
}
