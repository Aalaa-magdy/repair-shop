import { withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";

import { NextRequest } from "next/server";  

export default withAuth(
    async function middleware(request :NextRequest){

    },{
        isReturnToCurrentPage: true
    }
)

export const config = {
  matcher: [
    /*
     * Protect all routes under /dashboard, /profile, /settings
     * and API routes under /api/protected/*
     */
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/api/protected/:path*",
    "/home",
    "/tickets",
    "/customers"
  ],
};
 