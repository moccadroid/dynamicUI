
import Navbar from '@/app/components/Navbar';
import DynamicComponents from '@/app/components/DynamicComponents';
import { userData, xkcd } from '@/app/dataAndLayouts';


export default function HomePage() {
  const { layout, data } = userData;
  return (
    <div>
      <Navbar />
      <main>
        <DynamicComponents config={layout} data={data} />
      </main>
    </div>
  );
}
