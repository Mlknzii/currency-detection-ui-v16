import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="">
      <div className="container mx-auto p-4 max-w-5xl grid place-items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-500">
          مرحبا بك في متعرف العملات... <br /> كيف يمكنني مساعدتك ؟
        </h1>
        <p className=" text-lg text-gray-500 dark:text-gray-300 mt-4 text-center">
          لنبدأ بالتعرف الآن عن طريق التقاط أو رفع الصور.
        </p>
        <Link href="/predict" className="btn btn-primary inline-block mt-6">
          ابدأ الآن
          <FaArrowLeft className=" inline-block mr-2" />
        </Link>
        {/* <CurrencyRecognizer /> */}
      </div>
    </main>
  );
}
