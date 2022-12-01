import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useAuth } from 'state/Auth'

import { useGoogleOAuth } from '../state/GoogleOAuthProvider'
import {
    IdConfiguration,
    CredentialResponse,
    MomenListener,
    GsiButtonConfiguration,
    UserDataWithCredential,
} from '../types'

const containerHeightMap = { large: 40, medium: 32, small: 20 }

export type GoogleLoginProps = {
    onSuccess: (response: UserDataWithCredential) => void
    onError?: () => void
    promptMomentNotification?: MomenListener
    useOneTap?: boolean
    render?: boolean
} & Omit<IdConfiguration, 'client_id' | 'callback'> &
    GsiButtonConfiguration

export default function GoogleLogin({
    onSuccess,
    onError,
    useOneTap,
    render = true,
    promptMomentNotification,
    type = 'standard',
    theme = 'outline',
    size = 'large',
    text,
    shape,
    logo_alignment,
    width,
    locale,
    ...props
}: GoogleLoginProps) {
    const router = useRouter()
    const btnContainerRef = useRef<HTMLDivElement>(null)
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const onSuccessRef = useRef(onSuccess)
    onSuccessRef.current = onSuccess

    const onErrorRef = useRef(onError)
    onErrorRef.current = onError

    const promptMomentNotificationRef = useRef(promptMomentNotification)
    promptMomentNotificationRef.current = promptMomentNotification

    useEffect(() => {
        if (!scriptLoadedSuccessfully || isAuthenticated) return

        window.google?.accounts.id.initialize({
            client_id: clientId,
            callback: (credentialResponse: CredentialResponse) => {
                if (
                    !credentialResponse.clientId ||
                    !credentialResponse.credential
                ) {
                    return onErrorRef.current?.()
                }
                fetch(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
                )
                    .then((res) => res.json())
                    .then(async (response) => {
                        onSuccessRef.current({
                            ...response,
                            ...credentialResponse,
                        })

                        const { status } = await fetch(`/api/auth/identity`, {
                            method: 'POST',
                            headers: {
                                'content-type':
                                    'application/json;charset=UTF-8',
                            },
                            body: JSON.stringify({
                                response,
                            }),
                        })

                        if (status == 200) {
                            setLocalAuthentication(true)
                        }
                    })
                    .catch((error) => {
                        onSuccessRef.current(credentialResponse)
                    })
            },
            ...props,
        })

        window.google?.accounts.id.renderButton(btnContainerRef.current!, {
            type,
            theme,
            size,
            text,
            shape,
            logo_alignment,
            width,
            locale,
        })

        if (useOneTap)
            window.google?.accounts.id.prompt(
                promptMomentNotificationRef.current
            )

        return () => {
            if (useOneTap) window.google?.accounts.id.cancel()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        clientId,
        scriptLoadedSuccessfully,
        useOneTap,
        type,
        theme,
        size,
        text,
        shape,
        logo_alignment,
        width,
        locale,
    ])

    return (
        <>
            {render && (
                <div
                    ref={btnContainerRef}
                    style={{ height: containerHeightMap[size] }}
                />
            )}
        </>
    )
}
