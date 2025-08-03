import EditForm from "@/app/[boardType]/[_id]/edit/EditForm";
import { getPost } from "@/data/functions/post";

import { Metadata } from "next";

export async function generateMetadata({ params }: EditPageProps): Promise<Metadata>{
  const { boardType, _id } = await params;
  return {
    title: `${boardType} - 게시글 수정`,
    description: `${boardType} - 게시글을 수정하세요.`,
    openGraph: {
      title: `${boardType} - 게시글 수정`,
      description: `${boardType} - 게시글을 수정하세요.`,
      url: `/${boardType}/${_id}/edit`,
      images: {
        url: '/images/front-end.png'
      }
    }
  };
}

interface EditPageProps {
  params: Promise<{
    boardType: string;
    _id: string;
  }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { _id } = await params;
  const res = await getPost(Number(_id));

  return (
    <main className="flex-1 min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>

      { res.ok === 0 ? (
        <p>{ res.message }</p>
      ) : (
        <section className="mb-8 p-4">
          <EditForm post={ res.item } />
        </section>
      )}
      
    </main>
  );
}

