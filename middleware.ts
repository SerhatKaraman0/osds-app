import { NextResponse } from "next/server";
import { getSession } from "./actions";

const rolePaths = {
    student: ['/student/:path*'],
    staff: ['/staff/:path*'],
    sysadmin: ['/sysadmin/:path*'],
  };


export async function middleware(request) {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return NextResponse.redirect(
            new URL("http://localhost:3000/login", request.url)
        )
    }

    const userRole = session.role;
    const userId = session.userId;

    const allowedPaths = rolePaths[userRole] || [];
    const isAllowed = allowedPaths.some((path) => {
      const regex = new RegExp(`^${path.replace(':userId', userId).replace(':path*', '.*')}$`);
      return regex.test(request.nextUrl.pathname);
    });

    if (!isAllowed) {
        return NextResponse.redirect(
            new URL(`http://localhost:3000/unauthorized`, request.url)
        )
      }

    return NextResponse.next();
}

export const config = {
    matcher: ['/staff/:path*', '/student/:path*', '/sysadmin/:path*'],
}