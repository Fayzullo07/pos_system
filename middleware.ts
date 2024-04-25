import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { TypeUser } from "./app/api/auth/[...nextauth]/options";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = await getToken({ req: request });
  // const user: TypeUser | null = token?.user as TypeUser;
  const user = {
    account_type: "admin"
  };
  // let user: { account_type: string } = JSON.parse(localStorage.getItem('user') || 'admin');


  const Redirect = () => {
    if (user.account_type == "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (user.account_type == "chef") {

      return NextResponse.redirect(new URL("/chef", request.url));
    } else if (user.account_type == "order") {

      return NextResponse.redirect(new URL("/order", request.url));
    } else if (user.account_type == "orders") {

      return NextResponse.redirect(new URL("/orders", request.url));
    } else {

      return NextResponse.redirect(new URL("/", request.url));
    }
  };

  const authRoutes = ["/"];

  if (authRoutes.includes(pathname)) {
    return Redirect();
  }
  // if (
  //   (pathname.startsWith("/admin") && user.account_type !== "admin") ||
  //   (pathname.startsWith("/chef") && user.account_type !== "chef") ||
  //   (pathname.startsWith("/order") && user.account_type !== "order") ||
  //   (pathname.startsWith("/orders") && user.account_type !== "orders")
  // ) {
  //   return Redirect();
  // }

}

export const config = {
  matcher: [
    "/admin/:path*",
    // "/chef/:path*",
    // "/order/:path*",
  ],
};

