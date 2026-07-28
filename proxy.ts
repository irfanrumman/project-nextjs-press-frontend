import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    console.log("Proxy request:");
    console.log(request.nextUrl , "nextUrl");
    const pathname = request.nextUrl.pathname;
    console.log(pathname, "pathname");

//   return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/admin-dashboard/:path*',
//   ],
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}