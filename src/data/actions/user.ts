'use server';

import { uploadFile } from "@/data/actions/file";
import { ApiRes, ApiResPromise, User } from "@/types";
import { OAuthUser } from "@/types";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 회원가입 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원가입 폼 데이터(FormData 객체)
 * @returns 회원가입 결과 응답 객체
 * @description
 * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후, 회원가입 API를 호출합니다.
 */
export async function createUser(state: ApiRes<User> | null, formData: FormData): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try{
    // 첨부파일(프로필 이미지) 처리
    const attach = formData.get('attach') as File;
    let image;
    if(attach.size > 0){
      // 파일 업로드 API 호출
      const fileRes = await uploadFile(formData);
      console.log(`fileRes`, fileRes);
      if(fileRes.ok){
        image = fileRes.item[0].path;
      }else{
        return fileRes;
      }
    }

    // 회원가입 요청 바디 생성
    const body = {
      type: formData.get('type') || 'user',
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      ...(image ? { image } : {}),
    };

    console.log(`body`, body);

    // 회원가입 API 호출
    res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }

  return data;
}

/**
 * 로그인 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 * @description
 * 이메일/비밀번호로 로그인 API를 호출합니다.
 */
export async function login(state: ApiRes<User> | null, formData: FormData | User): ApiResPromise<User> {
  const body = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

  let res: Response;
  let data: ApiRes<User>;

  try{
    // 로그인 API 호출
    res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }
  
  return data;
}



/**
 * OAuth 인증 후 자동 회원가입 함수
 * @param user - OAuth 사용자 정보 객체
 * @returns 회원가입 결과 응답 객체
 * @description
 * OAuth 제공자 인증 후 자동으로 회원가입을 처리합니다.
 */
export async function createUserWithOAuth(user: OAuthUser): ApiResPromise<User> {
  const res = await fetch(`${API_URL}/users/signup/oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
    },
    body: JSON.stringify(user)
  });

  return res.json();
}

/**
 * OAuth 제공자로 인증된 사용자를 API 서버에 로그인 처리
 * @param providerAccountId - OAuth 제공자 계정 ID
 * @returns 로그인 결과 응답 객체
 * @description
 * OAuth 제공자 계정 ID를 사용하여 기존 사용자를 로그인 처리합니다.
 */
export async function loginWithOAuth(providerAccountId: string): ApiResPromise<User> {
  const res = await fetch(`${API_URL}/users/login/with`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Client-Id': CLIENT_ID,
    },
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}

/**
 * Auth.js 기반 로그인 함수
 * @param provider - 로그인 제공자 ('credentials', 'google', 'github', 'naver', 'kakao')
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns Promise<void>
 * @description
 * credentials 로그인 시 email/password를 사용하고, OAuth 로그인 시 provider만 사용합니다.
 */
export async function loginWithAuthjs(provider: string, formData: FormData){
  // 로그인 후에 이동해야 할 페이지(redirect 파라미터) 추출
  const redirectTo = formData.get('redirect') as string || '/';

  await signIn(provider, { redirectTo });
}

/**
 * Auth.js 기반 Credentials 로그인 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 * @description
 * Auth.js의 credentials 제공자를 사용하여 로그인을 처리합니다.
 */
export async function loginWithCredentials(state: ApiRes<User> | null, formData: FormData): ApiResPromise<User> {
  // 로그인 후에 이동해야 할 페이지(redirect 파라미터) 추출
  const redirectTo = formData.get('redirect') as string || '/';

  try{
    await signIn('credentials', {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      redirect: false
    });
    
  }catch(err){
    if(err instanceof Error){
      return err.cause as ApiRes<User>;
    }
  }
  redirect(`${redirectTo}?refresh=1`);
}