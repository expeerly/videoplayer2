import { NextPage } from 'next';
import { Button } from '../../components/client/Button';

const Page: NextPage = () => {
  return (
    <div className="flex gap-2 justify-center py-5">
      <Button href="/admin/upload">Go to upload CSV</Button>
      <Button href="/admin/logs">Go to check logs</Button>
      <Button href="/admin">Download reports</Button>
    </div>
  );
};

export default Page;
