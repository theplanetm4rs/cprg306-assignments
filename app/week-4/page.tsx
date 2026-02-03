import Link from "next/link";
import NewItem from "./new-item";
import PaulsCanopyImage from "../components/paulscanopyimage";

export default function Page() {
  return (
    <main>
      <div className= "flex flex-row items-center">
          <PaulsCanopyImage />
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