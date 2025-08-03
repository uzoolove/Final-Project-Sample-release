import CommentItem from "@/app/[boardType]/[_id]/CommentItem";
import CommentNew from "@/app/[boardType]/[_id]/CommentNew";
import { getReplies } from "@/data/functions/post";
import { PostReply } from "@/types";

export default async function CommentList({ _id }: { _id: string }) {

  const res = await getReplies(Number(_id));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { res.ok ? res.item.length : 0 }개</h4>

      { res.ok ? 
        res.item.map((reply: PostReply) => (
          <CommentItem key={reply._id} reply={reply} />
        )) : 
        <p>{ res.message }</p>
      }

      <CommentNew _id={_id} />
    </section>
  );
}