
import TypingTest from "../components/TypingTest/page";
import Navbar from "../components/navbar/page";

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <TypingTest />
      </div>
    </div>
  );
}
