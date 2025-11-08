import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

const commonProtectedRoutes : RouteConfig = {
  exact : ["/my-profile", "/setting"],
  patterns : [],
}

const doctorProtectedRoutes : RouteConfig = {
  patterns : [/^\/doctor/],
  exact : [],   // like assistants
}

const adminProtectedRoutes : RouteConfig = {
  patterns : [/^\/admin/],
  exact : [],
}

const patientProtectedRoutes : RouteConfig = {
  patterns : [/^\/dashboard/],    // for patients only start 
  exact : [],
}

const isAuthRoute = (pathname : string) => {
   return authRoutes.some((route : string) => route === pathname)
}
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value || null;
  let userRole : UserRole | null = null;
  
  if(accessToken){
     const verifiedToken : JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string);

     if(typeof verifiedToken === "string"){
       cookieStore.delete("accessToken");
       cookieStore.delete("refreshToken");
       return NextResponse.redirect(new URL('/login', request.url))
     }

     userRole = verifiedToken.role;

  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}