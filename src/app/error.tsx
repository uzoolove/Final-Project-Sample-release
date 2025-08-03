'use client';

import Error from "@/components/common/Error";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);
  return (
    <Error message="예상치 못한 오류가 발생했습니다." />
  );
}
