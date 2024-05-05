'use client';

import Navbar from '@/app/components/app/Navbar';
import DynamicComponents from '@/app/components/DynamicComponents';
import { useStateContext } from '@/state/Provider';


export default function HomePage() {
  const { state } = useStateContext();

  return (
    <div>
      <Navbar />
      <main>
        <DynamicComponents config={state.layout}/>
      </main>
    </div>
  );
}
