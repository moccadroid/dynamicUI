'use client';

import Navbar from '@/app/components/app/Navbar';
import DynamicComponents from '@/app/components/DynamicComponents';
import { Stack } from '@chakra-ui/react';


export default function HomePage() {

  return (
    <Stack>
      <Navbar />
      <DynamicComponents />
    </Stack>
  );
}
