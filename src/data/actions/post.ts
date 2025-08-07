'use server';

import { ApiRes, ApiResPromise, Post, PostReply } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 게시글을 생성하는 함수
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 게시글을 생성하고, 성공 시 해당 게시판으로 리다이렉트합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function createPost(state: ApiRes<Post> | null, formData: FormData): ApiResPromise<Post> {
  // FormData를 일반 Object로 변환
  const body = Object.fromEntries(formData.entries());
  const session = await auth(); // 로그인 된 사용자 정보 가져오기
  const accessToken = session?.user?.accessToken;

  let res: Response;
  let data: ApiRes<Post>;

  try{
    res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

    if(data.ok){
      // 현재 시간에서 30초 후 한국 시간으로 생성
      const now = new Date();
      now.setSeconds(now.getSeconds() + 30); // 30초 후

      // UTC 시간에 9시간을 더해서 한국 시간으로 변환
      const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      
      // 한국 시간을 "2025.08.05 03:43:01" 형식으로 생성
      const year = koreaTime.getUTCFullYear();
      const month = String(koreaTime.getUTCMonth() + 1).padStart(2, '0');
      const day = String(koreaTime.getUTCDate()).padStart(2, '0');
      const hours = String(koreaTime.getUTCHours()).padStart(2, '0');
      const minutes = String(koreaTime.getUTCMinutes()).padStart(2, '0');
      const seconds = String(koreaTime.getUTCSeconds()).padStart(2, '0');
      
      const time = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

      console.log('현재 UTC 시간:', now.toISOString());
      console.log('생성된 한국 시간:', time);

      // 게시글 생성 후 1시간 후에 통계를 이메일로 전송하도록 스케줄러 등록
      const schedulerRes = await fetch(`${API_URL}/scheduler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: '이메일 전송',
          description: '게시글 생성 후 1시간 후 통계 이메일 전송',
          endpoint: `https://lion-board-tau.vercel.app/api/scheduler/posts/${data.item._id}`,
          time,
        }),
      });

      console.log(schedulerRes);
    }
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }

  // redirect는 예외를 throw 하는 방식이라서 try 문에서 사용하면 catch로 처리되므로 제대로 동작하지 않음
  if (data.ok) {
    revalidatePath(`/${body.type}`);
    redirect(`/${body.type}`);
  }else{
    return data;
  }
}

/**
 * 댓글을 생성하는 함수
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 생성 결과 응답 객체
 * @description
 * 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createReply(state: ApiRes<PostReply> | null, formData: FormData): ApiResPromise<PostReply> {
  const body = {
    content: formData.get('content'),
  };

  const session = await auth(); // 로그인 된 사용자 정보 가져오기
  const accessToken = session?.user?.accessToken;

  const _id = formData.get('_id');

  let res: Response;
  let data: ApiRes<PostReply>;

  try{
    res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }
  
  if (data.ok) {
    revalidateTag(`posts/${_id}/replies`);
  }
  
  return data;
}

/**
 * 게시글을 수정하는 함수
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 수정 결과 응답 객체
 * @description
 * 게시글을 수정하고, 성공 시 해당 게시글 상세 페이지로 이동합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function updatePost(state: ApiRes<Post> | null, formData: FormData): ApiResPromise<Post> {
  const _id = formData.get('_id'); // 게시글 고유 ID
  const type = formData.get('type'); // 게시판 타입
  const session = await auth(); // 로그인 된 사용자 정보 가져오기
  const accessToken = session?.user?.accessToken;

  const body = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  let res: Response;
  let data: ApiRes<Post>;
  
  try{
    // 게시글 수정 API 호출
    res = await fetch(`${API_URL}/posts/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }

  // 수정 성공 시 해당 게시글 상세 페이지로 이동
  if (data.ok) {
    revalidateTag(`posts/${_id}`); // 게시글 상세 페이지 갱신
    revalidateTag(`posts?type=${type}`); // 게시글 목록 페이지 갱신
    redirect(`/${type}/${_id}`);
  }else{
    return data;
  }
}

/**
 * 게시글을 삭제하는 함수
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 삭제 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 게시글을 삭제하고, 성공 시 해당 게시판 목록 페이지로 리다이렉트합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function deletePost(state: ApiRes<Post> | null, formData: FormData): ApiResPromise<Post> {
  const _id = formData.get('_id');
  const type = formData.get('type');
  const session = await auth(); // 로그인 된 사용자 정보 가져오기
  const accessToken = session?.user?.accessToken;

  let res: Response;
  let data: ApiRes<{ ok: 0 | 1 }>;
  
  try{
    res = await fetch(`${API_URL}/posts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }

  if (data.ok) {
    revalidateTag(`posts/${_id}`);
    revalidateTag(`posts?type=${type}`);
    redirect(`/${type}`);
  }else{
    return data;
  }
}

/**
 * 댓글을 삭제하는 함수
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteReply(state: ApiRes<PostReply> | null, formData: FormData): ApiResPromise<PostReply> {
  const _id = formData.get('_id');
  const replyId = formData.get('replyId');
  const session = await auth(); // 로그인 된 사용자 정보 가져오기
  const accessToken = session?.user?.accessToken;

  let res: Response;
  let data: ApiRes<PostReply>;
  
  try{
    res = await fetch(`${API_URL}/posts/${_id}/replies/${replyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 이용해 주시기 바랍니다.' };
  }

  if (data.ok) {
    revalidateTag(`posts/${_id}/replies`);
  }
  
  return data;
}
