import 'styles/global.css'

import { ThemeProvider } from 'next-themes'
import Container from 'components/Container'
import { AuthProvider } from 'state/Auth'
import GoogleOAuthProvider from 'state/GoogleOAuthProvider'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID}>
            <AuthProvider>
                <ThemeProvider attribute="class">
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </ThemeProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    )
}
