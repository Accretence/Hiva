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
                <div className="mb-2">
                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log(response)
                        }}
                        render={true}
                    />
                </div>
                <small className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    By logging in, you agree to our{' '}
                    <Link className="font-semibold underline" href="/terms">
                        terms of service
                    </Link>
                    .
                </small>
            </div>
        </Modal>
    )
}
