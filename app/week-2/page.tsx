import Link from "next/link";
import StudentInfo from "./student-info";
export default function Page() {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Week 2 Assignment
      </h1>
      <StudentInfo />
      <Link href="/">Go Back Home</Link>
    </div>
  );
}