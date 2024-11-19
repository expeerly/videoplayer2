import { Filter } from '@/src/app/components/client/Filter';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <Filter />
    </div>
  );
};

export default Page;
