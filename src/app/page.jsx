import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <div className="container mx-auto p-4 max-w-5xl grid place-items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-500">
          مرحبا بك في متعرف العملات... <br /> كيف يمكنني مساعدتك ؟
        </h1>
        <button onClick={() => router.replace("/predict")}  className="btn btn-primary inline-block mt-6">
          ابدأ الآن
          <FaArrowLeft className=" inline-block mr-2" />
        </button>
        {/* <CurrencyRecognizer /> */}
      </div>
    </main>
  );
}
