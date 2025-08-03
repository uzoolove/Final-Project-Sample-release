import { LinkButton } from "@/components/ui/LinkButton";
import CommentList from "@/app/[boardType]/[_id]/CommentList";

import { Metadata } from "next";
import { getPost } from "@/data/functions/post";
import DeleteForm from "@/app/[boardType]/[_id]/DeleteForm";

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata>{
  const { boardType, _id } = await params;
  return {
    title: `${boardType} - React란?`,
    description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
    openGraph: {
      title: `${boardType} - React란?`,
      description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
      url: `/${boardType}/${_id}`,
      images: {
        url: '/images/front-end.png'
      }
    }
  };
}

interface InfoPageProps {
  params: Promise<{
    boardType: string;
    _id: string;
  }>;
}

export default async function InfoPage ({ params }: InfoPageProps) {
  const { boardType, _id } = await params;

  const res = await getPost(Number(_id));
  console.log('res', res);

  return (
    <main className="flex-1 container mx-auto mt-4 px-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 상세</h2>
      </div>

      { res.ok === 0 ? (
        <p>{ res.message }</p>
      ) : (
        <>
          <section className="mb-8 p-4">
            <div className="font-semibold text-xl">제목 : { res.item?.title }</div>
            <div className="text-right text-gray-400">
              <div>작성자 : { res.item?.user.name }</div>
              <div>{ res.item?.createdAt }</div>
            </div>
            <div className="mb-4">
              <div>
                <p className="w-full p-2 whitespace-pre-wrap">{ res.item?.content }</p>
              </div>
              <hr/>
            </div>
            <div className="flex justify-end my-4">
              <LinkButton href={`/${boardType}`}>목록</LinkButton>
              <LinkButton href={`/${boardType}/${_id}/edit`} bgColor="gray" ownerId={res.item?.user._id}>수정</LinkButton>
              <DeleteForm boardType={boardType} _id={_id} ownerId={res.item?.user._id} />
            </div>
          </section>
      
          <CommentList _id={_id} />
        </>
      )}      
    </main>
  );
}
