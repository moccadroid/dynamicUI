'use client';

import Navbar from '@/app/components/app/Navbar';
import DynamicComponents from '@/app/components/DynamicComponents';
import { useStateContext } from '@/state/Provider';
import { Stack } from '@chakra-ui/react';


export default function HomePage() {
  const { state } = useStateContext();

  return (
    <Stack>
      <Navbar />
      <DynamicComponents config={state.layout}/>
    </Stack>
  );
}
