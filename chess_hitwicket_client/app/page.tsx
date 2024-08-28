import GameControl from "@/components/Game/GameControl";
import { Toaster } from 'react-hot-toast';
export default function Home() {

  return (
    <main className="bg-orange-100 flex min-h-screen flex-col items-center justify-between p-24">
    <Toaster
        toastOptions={{
          className: 'animate-bounce',
        }}
      />
    <GameControl></GameControl>
    </main>
  );
}
