import CommentDeleteForm from "@/app/[boardType]/[_id]/CommentDeleteForm";
import { PostReply } from "@/types";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentItem({ reply }: { reply: PostReply }) {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          { reply.user.image && (
            <Image
              className="w-8 mr-2 rounded-full"
              src={reply.user.image?.startsWith('http') ? reply.user.image : `${API_URL}/${reply.user.image}`}
              alt={`${reply.user.name} 프로필 이미지`}
              width="32"
              height="32"
            />
          )}
          <Link href="" className="text-orange-400">{ reply.user.name }</Link>
        </div>
        <time className="text-gray-500" dateTime={reply.createdAt}>{ reply.createdAt }</time>
      </div>
      <div className="flex justify-between items-start mb-2">
        <p className="whitespace-pre-wrap text-sm flex-1">{ reply.content }</p>
        <CommentDeleteForm reply={ reply } />
      </div>
    </div>
  );
}