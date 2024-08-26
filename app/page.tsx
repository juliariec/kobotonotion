import Walkthrough from "./Walkthrough";
import Form from "./Form";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4 mt-16">
      <Walkthrough />
      <Form />
    </main>
  );
}
