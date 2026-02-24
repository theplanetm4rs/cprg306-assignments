import Link from "next/link";
import MonkeyList from "./monkey-list";
import NewItem from "./new-item";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex-col">
      <div className= "flex flex-row items-center justify-between">
        <MonkeyList />
        <NewItem />
      </div>
      <div>
        <Link 
        className="flex h-12 w-50 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] w"
        href="/">Go Back Home</Link>
      </div>
    </main>
  );
}