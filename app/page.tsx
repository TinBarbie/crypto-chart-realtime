import Table from "@/components/Table";

export default function Home() {
  return (
    <div className="min-h-screen h-full w-full bg-red-100 flex justify-center">
      <div className="lg:w-[980px] sm:w-[495px] w-full max-sm:px-4 pt-20 flex flex-col items-center gap-10">
        <h1 className="lg:text-5xl text-3xl text-blue-400 text-center">
          Binance realtime chart
        </h1>
        <Table />
      </div>
    </div>
  );
}
