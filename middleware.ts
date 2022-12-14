import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getJWTPayload } from 'lib/jwt'

export async function middleware(request: NextRequest) {
    if (!request.cookies.get('AJWT')) {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (!(await getJWTPayload(request.cookies.get('AJWT')))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // if (
    //     request.url.includes('/cms') ||
    //     !(await gateAdmin(request, NextResponse))
    // ) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
}

export const config = {
    matcher: ['/user/:path*', '/cart/:path*', '/admin/:path*', '/cms/:path*'],
}
