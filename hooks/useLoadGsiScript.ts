import { useState, useEffect, useRef } from 'react'

export interface UseLoadGsiScriptOptions {
    /**
     * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
     */
    onScriptLoadSuccess?: () => void
    /**
     * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
     */
    onScriptLoadError?: () => void
}

export default function useLoadGsiScript(
    options: UseLoadGsiScriptOptions = {}
): boolean {
    setTimeout(function () {
        return
    }, 2000)

    return true
}
