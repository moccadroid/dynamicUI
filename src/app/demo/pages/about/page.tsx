'use client';

import Section from '@/dynamicUI/components/Section';
import landingpageLayout from '../../layouts/landingpage.layout.json';
import landingpageData from '../../data/landingpage.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export default function LandingPage() {

  return (

    <Section layout={landingpageLayout as LayoutConfig} data={landingpageData} />

  );
}
