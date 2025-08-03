import { Metadata } from "next";
import SignupForm from "@/app/(user)/signup/SignupForm";

export async function generateMetadata(): Promise<Metadata>{
  return {
    title: `회원가입 - Lion Board`,
    description: `무료 회원 가입후 라이언 보드의 모든 서비스를 이용하세요.`,
    openGraph: {
      title: `회원가입 - Lion Board`,
      description: `무료 회원 가입후 라이언 보드의 모든 서비스를 이용하세요.`,
      url: `/signup`,
      images: {
        url: '/images/front-end.png'
      }
    }
  };
}

export default async function SignupPage() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">회원 가입</h2>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}
