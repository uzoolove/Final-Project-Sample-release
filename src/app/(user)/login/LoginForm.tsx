'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { loginWithAuthjs, loginWithCredentials } from "@/data/actions/user";
import { useActionState } from "react";

export default function LoginForm({ redirect }: { redirect: string }) {
  const [ userState, formAction ] = useActionState(loginWithCredentials, null);

  return (
    <>
      { userState?.ok === 0 && (
        <div className="text-center py-4">
          <p className="text-red-500 dark:text-red-400">{userState.message}</p>
        </div>
      ) }
      <form action={ formAction }>
        <input type="hidden" name="redirect" value={redirect || ''} />
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
            name="email"
            defaultValue="u1@market.com"
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{ userState?.ok === 0 && userState.errors?.email?.msg }</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
            name="password"
            defaultValue="11111111"
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{ userState?.ok === 0 && userState.errors?.password?.msg }</p>
          <Link href="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="mt-10 flex justify-center items-center flex-wrap gap-3">
          <Button type="submit">로그인</Button>
          <Button type="submit" formAction={loginWithAuthjs.bind(null, 'kakao')}>카카오 로그인</Button>
          <Button type="submit" formAction={loginWithAuthjs.bind(null, 'naver')}>네이버 로그인</Button>
          <Button type="submit" formAction={loginWithAuthjs.bind(null, 'google')}>구글 로그인</Button>
          <Button type="submit" formAction={loginWithAuthjs.bind(null, 'github')}>깃허브 로그인</Button>
        </div>
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-gray-800 hover:underline">회원가입</Link>
        </div>
      </form>
    </>
    
  );
}