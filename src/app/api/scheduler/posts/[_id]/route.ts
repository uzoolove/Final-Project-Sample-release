import { sendEmail } from "@/data/actions/email";
import { getPost } from "@/data/functions/post";
import { getUser } from "@/data/functions/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  const { _id } = await params;
  const postRes = await getPost(Number(_id));
  if(postRes.ok === 1){
    const user_id = postRes.item?.user._id;
    const userRes = await getUser(user_id);
    if(userRes.ok === 1){
      const emailRes = await sendEmail(null, {
        to: userRes.item?.email,
        serviceName: '라이언 보드',
        subject: postRes.item?.title + ' 게시글 알림',
        content: `<h1>${postRes.item?.title}</h1><p>조회: ${postRes.item?.views}회.</p><p>북마크: ${postRes.item?.bookmarks}건.</p><p>댓글: ${postRes.item?.replies?.length||0}건.</p><ul>${postRes.item?.replies?.map((reply) => `<li>${reply.content}</li>`).join('') || '<li>댓글이 없습니다.</li>'}</ul>`,
      });
      if(emailRes.ok === 1){
        console.log(`메일 전송 완료 ${_id}`);
        return NextResponse.json({ok: 1, message: `${userRes.item?.email} 메일 전송 완료`});
      }
    }
  }
  return NextResponse.json({ok: 0, message: `${_id}번 게시물에 대한 스케쥴러 작업 실패`});
};