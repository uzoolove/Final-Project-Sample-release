'use client';

import { btnColor, btnSize, baseButtonClass } from './buttonStyle';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// LinkButton에 전달할 수 있는 속성 정의
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode; // 버튼 내부에 표시될 내용
  href: string; // 이동할 경로
  needLogin?: boolean; // 로그인 필요 여부
  ownerId?: number; // 특정 사용자에게만 노출할 경우 사용
  bgColor?: 'gray' | 'orange' | 'red'; // 버튼 배경색
  size?: 'sm' | 'md' | 'lg'; // 버튼 크기
  className?: string; // 추가 클래스
}

// LinkButton 컴포넌트 정의
export const LinkButton: React.FC<LinkButtonProps> = ({ children, href, bgColor='orange', size='md', className='', needLogin, ownerId, ...rest }) => {
  const { data: session, status } = useSession(); // NextAuth 세션 사용
  const user = session?.user;

  // 로딩 중일 때는 버튼을 숨김
  if (status === 'loading') return null;

  // 로그인 필요 & 로그인 안 된 경우 버튼 미노출
  if (needLogin && !user) return null;
  // ownerId가 있고, 현재 로그인 사용자가 owner가 아니면 버튼 미노출
  if (ownerId && user?.id !== String(ownerId)) return null;

  return (
    <Link
      href={ href }
      className={`${ baseButtonClass } ${ btnColor[bgColor] } ${ btnSize[size] } inline-flex items-center ${ className }`}
      { ...rest }
    >
      { children }
    </Link>
  );
};