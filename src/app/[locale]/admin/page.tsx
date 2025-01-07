import { NextPage } from 'next';
import { Button } from '../../components/client/Button';
import { CountsTable } from '../../components/client/CountsTable';

const Page: NextPage = async () => {
  const counts = await fetch(`${process.env.NEXT_ENDPOINT_URL}/counts`);
  const { data } = await counts.json();

  return (
    <div className="flex flex-col justify-center py-8 gap-10">
      <div className="flex gap-2 justify-center pb-5">
        <Button href="/admin/upload">Go to upload CSV</Button>
        <Button href="/admin/logos">Go to check logos</Button>
      </div>
      <div className="max-w-md mx-auto">
        <CountsTable data={data} />
      </div>
    </div>
  );
};

export default Page;
