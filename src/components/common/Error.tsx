import Link from "next/link";

export default function Error({ message }: { message: string }) {
  return (
    <main className="flex-1 py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
      <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
      <h3 className="text-md font-semibold mb-2 text-center">{ message }</h3>
      <p className="pt-12 text-center">이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!</p>
      <Link href="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
        ⚙️ 홈으로 이동
      </Link>
    </main>
  );
}
