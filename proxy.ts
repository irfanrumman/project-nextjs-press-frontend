import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';
 

const AUTH_ROUTES = [
    "/register",
    "/login",
]

// const PUBLIC_ROUTES = [
//     "/",
//     "/news",
//     "/register",
//     "/login",
// ];

const PUBLIC_ROUTES = [
    "/",
    "/news",
];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    // console.log("Proxy request:");
    // console.log(request.nextUrl , "nextUrl");
    // console.log(pathname, "pathname");

//   return NextResponse.redirect(new URL('/', request.url))


   const cookieStore = await cookies();
//    const accessToken = cookieStore.get('accessToken')?.value;
      
     let accessToken = request.cookies.get('accessToken')?.value;
     const refreshToken = request.cookies.get('refreshToken')?.value;

    //  const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;
     let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

     const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;


     if(!decodedAccessToken?.success && decodedRefreshToken?.success){
        // access is expired but refresh token is valid, get new access token
        const result = await getNewAccessToken();

        if(result.success){
            const newAccessToken = result.data.accessToken;
            cookieStore.set('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax',
            }); 

             //re-assign accessToken after getting new access token
            accessToken = newAccessToken;

            //re-assign decodedAccessToken after getting new access token
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
     }

     let userRole = null;

    //  if (decodedToken) {
    //     userRole = decodedToken.role;
    //     }

    if (!decodedAccessToken?.success) {
        // const cookieStore = await cookies();
        cookieStore.delete("accessToken");
    //    return NextResponse.redirect(new URL('/login', request.url));
    }

    if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role ;
    }


        if (accessToken && AUTH_ROUTES.includes(pathname)) {
            if (userRole === "USER") {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } else if (userRole === "ADMIN") {
                return NextResponse.redirect(new URL('/admin-dashboard', request.url));
            } else if (userRole === "AUTHOR") {
                return NextResponse.redirect(new URL('/author-dashboard', request.url));
            }else {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }


    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));


    // if (!accessToken && !isPublicRoute) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    

    // Authenticated routes are handled; Authorized routes are not.
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    //Authorization : role based access control
    if (pathname.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if (pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }


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