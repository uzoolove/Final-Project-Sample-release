'use client';

import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserInfo() {
  // Auth.js를 사용한 세션 정보 관리
  const { data: session, status, update } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // 로그인 후 새로고침 처리 (컴포넌트 렌더링 시)
  const refresh = searchParams.get('refresh');

  /**
   * 로그인 후 리다이렉트 처리 및 세션 업데이트
   * refresh 파라미터가 있으면 URL에서 제거하고 세션을 강제 업데이트
   */
  useEffect(() => {
    if (refresh) {
      // 현재 경로에서 refresh 파라미터만 제거
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('refresh');
      const newUrl = newSearchParams.toString() ? `${pathname}?${newSearchParams.toString()}` : pathname;
      router.replace(newUrl);
      // Auth.js 세션 강제 업데이트
      update();
    }
  }, [refresh]);

  /**
   * 로그아웃 처리 함수
   * signOut을 호출하여 로그아웃 진행
   * 메인 페이지로 리다이렉트
   */
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: '/' });
    alert('로그아웃 되었습니다.');
  };

  // 사용자 정보 로딩 중일 때 빈 화면 표시
  if (status === "loading") {
    return ;
  }
  
  return (
    <>
      { user ? (
        <form onSubmit={ handleLogout }>
          <p className="flex items-center">
            { user.image && (
              <Image 
                className="w-8 h-8 object-cover rounded-full mr-2" 
                src={user.image?.startsWith('http') ? user.image : `${API_URL}/${user.image}`}
                width="32"
                height="32"
                alt={`${user.name} 프로필 이미지`}
              />
            )}
            {user.name}님 :)
            <Button type="submit" size="sm" bgColor="gray">로그아웃</Button>
          </p>
        </form>
      ) : (
        <div className="flex justify-end">
          <LinkButton href="/login" size="sm" bgColor="orange">로그인</LinkButton>
          <LinkButton href="/signup" size="sm" bgColor="gray">회원가입</LinkButton>
        </div>
      )}
    </>
  );
}