import Link from "next/link";
import NewItem from "./new-item";

export default function Page() {
  return (
    <main className= "justify-center items-center flex flex-col">
        <div>
            <NewItem />
            <Link href="/">Go Back Home</Link>
        </div>
    </main>
  );
}