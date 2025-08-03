'use client';

import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { createPost } from "@/data/actions/post";
import { useActionState } from "react";

export default function RegistForm({ boardType }: { boardType: string }) {
  const [ state, formAction, isLoading ] = useActionState(createPost, null);
  console.log(isLoading, state);
  return (
    <>
      <form action={ formAction }>
        {/* 로그인 된 사용자일 경우 서버 액션에 accessToken 전달 */}
        <input type="hidden" name="type" value={ boardType } />
        <div className="my-4">
          <label className="block text-lg content-center" htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요." 
            className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            name="title"
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{ state?.ok === 0 && state.errors?.title?.msg }</p>
        </div>
        <div className="my-4">
          <label className="block text-lg content-center" htmlFor="content">내용</label>
          <textarea 
            id="content"
            rows={15}
            placeholder="내용을 입력하세요."
            className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            name="content"
          ></textarea>
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{ state?.ok === 0 && state.errors?.content?.msg }</p>
        </div>
        <hr />
        <div className="flex justify-end my-6">
          <Button type="submit" disabled={ isLoading }>등록</Button>
          <LinkButton href={`/${boardType}`} bgColor="gray">취소</LinkButton>
        </div>
      </form>
    </>
  );
}
