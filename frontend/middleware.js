import { NextResponse } from 'next/server'

export function middleware(request) {
  const { cookies, url } = request
  const { origin } = request.nextUrl.clone()
  const token = request.cookies.get('client-token')

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(origin + '/authorization')
  }

  if (token && request.nextUrl.pathname.includes('/authorization')) {
    return NextResponse.redirect(origin + '/calendar')
  }

  if (!token && request.nextUrl.href.includes('/calendar')) {
    return NextResponse.redirect(origin + '/authorization')
  }

  if (!token && request.nextUrl.href.includes('/completed')) {
    return NextResponse.redirect(origin + '/authorization')
  }

}
