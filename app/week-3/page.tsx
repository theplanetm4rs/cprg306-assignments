import Link from "next/link";
import ItemList from "./item-list";

export default function Page() {
  return (
    <main className= "justify-center items-center flex flex-col">
        <div>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mr-66">Shopping List</h1>
            <ItemList />
            <Link href="/">Go Back Home</Link>
        </div>
    </main>
  );
}