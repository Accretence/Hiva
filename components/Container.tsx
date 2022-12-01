import Footer from 'components/Footer'
import Header from 'components/Header'
import GoogleLogin from './GoogleLogin'

export default function Container({ children }) {
    return (
        <div>
            <main
                id="skip"
                className="flex flex-col justify-center px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[20rem]"
            >
                <Header />
                <div className="hidden">
                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log(response)
                        }}
                        onError={() => {
                            console.log('Login Failed')
                        }}
                        useOneTap
                    />
                </div>
                {children}
                <Footer />
            </main>
        </div>
    )
}
