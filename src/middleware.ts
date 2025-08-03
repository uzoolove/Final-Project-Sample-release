import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
  console.log('미들웨어 호출', request.nextUrl.href);
  const session = await auth();

  if(!(session?.user)){ // 로그인 되지 않은 경우
    return NextResponse.redirect(`${request.nextUrl.origin}/login?redirect=${request.nextUrl.pathname}`);
  }

  // 공지사항 글작성이나 수정 페이지에 관리자가 아닌 일반 유저가 접근한 경우
  if(request.nextUrl.pathname.startsWith('/notice') && session.user.type !== 'admin'){
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  }
}

export const config = {
  matcher: [ // matcher에 정의한 패턴과 일치하는 url이 요청될 경우 미들웨어가 실행됨
    '/:type/new', // 글작성 페이지
    '/:type/:_id/edit' // 글수정 페이지
  ]
};