import { ApiResPromise, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 지정한 사용자의 상세 정보를 가져옵니다.
 * @param {number} _id - 사용자의 고유 ID
 * @returns {Promise<ApiRes<User>>} - 사용자 상세 정보 응답 객체
 */
export async function getUser(_id: number): ApiResPromise<User> {
  try{
    const res = await fetch(`${API_URL}/users/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        tags: [`users/${_id}`],
      },
    });
    return res.json();
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}
