import Link from 'next/link'
import { getGoogleURL } from 'lib/google'
import { GoogleBAWIcon } from 'components/Icons'
import Modal from 'components/modals/Modal'
import GoogleLogin from 'components/GoogleLogin'

export default function LoginModal({ modalVisibility, setModalVisibility }) {
    return (
        <Modal
            title="Login / Register"
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
        >
            <div className="px-6 pt-0 pb-6">
                <div className="w-full">
                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log(response)
                        }}
                        onError={() => {
                            console.log('Login Failed')
                        }}
                    />
                </div>

                <small className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    By logging in, you agree to our{' '}
                    <Link
                        className="font-semibold text-purple-600 hover:text-purple-300"
                        href="/terms"
                    >
                        terms of service
                    </Link>
                    .
                </small>
            </div>
        </Modal>
    )
}
