'use server';

import { ApiRes, ApiResPromise } from "@/types";
import { Email } from "@/types/email";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 이메일 전송 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 이메일 전송 폼 데이터(FormData 객체)
 * @returns 이메일 전송 결과 응답 객체
 * @description
 * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후, 회원가입 API를 호출합니다.
 */
export async function sendEmail(state: ApiRes<Email> | null, body: Email): ApiResPromise<Email> {
  let res: Response;
  let data: ApiRes<Email>;

  try{
    console.log(`body`, body);

    // 이메일 전송 API 호출
    res = await fetch(`${API_URL}/email`, {
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
