import Walkthrough from "./Walkthrough";
import Form from "./Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Walkthrough />
      <Form />
    </main>
  );
}
