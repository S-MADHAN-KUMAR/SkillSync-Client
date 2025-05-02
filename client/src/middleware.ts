import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authPages = ['/login', '/register', '/forgotpassword']

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isAuthPage = authPages.includes(path)
    const isCandidateRoute = path.startsWith('/candidate')
    const isEmployeeRoute = path.startsWith('/employee')
    const isAdminRoute = path.startsWith('/admin')
    const isAdminLoginRoute = path === '/admin/login'

    let candidateToken = request.cookies.get('candidateToken')?.value
    let employeeToken = request.cookies.get('employeeToken')?.value
    let adminToken = request.cookies.get('adminToken')?.value

    if (path.startsWith('/register/') || path.startsWith('/forgotpassword/')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if ((candidateToken || employeeToken) && isAuthPage) {
        const employeeTo = candidateToken ? '/candidate' : '/employee'
        return NextResponse.redirect(new URL(employeeTo, request.url))
    }

    if (candidateToken && isEmployeeRoute) {
        return NextResponse.redirect(new URL('/candidate', request.url))
    }

    if (employeeToken && isCandidateRoute) {
        return NextResponse.redirect(new URL('/employee', request.url))
    }

    if ((isCandidateRoute || isEmployeeRoute) && !candidateToken && !employeeToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAdminRoute && !isAdminLoginRoute && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isAdminLoginRoute && adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/candidate/:path*',
        '/employee/:path*',
        '/admin/:path*',
        '/login',
        '/register',
        '/forgotpassword/:path*',
    ],
}
