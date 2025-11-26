import Image from "next/image";

export default function Home() {
  return (
    <div className=" p-4">
      <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-100px)] rounded-md shadow-sm">
        <Image src={"/images/color-logo.png"} width={200} height={200} alt="Logo" />
        <p className="text-body">Welcome to Digitalflake admin</p>
      </div>
    </div>
  );
}
