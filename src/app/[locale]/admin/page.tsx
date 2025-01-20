import { NextPage } from 'next';
import { Button } from '../../components/client/Button';
import { CountsTable } from '../../components/client/CountsTable';
import { LogoutButton } from '../../components/client/LogoutButton';
import { getCounts } from '../../actions/actions';

const Page: NextPage = async () => {
  const { data } = await getCounts();

  console.log({ counts: data });

  return (
    <div className="flex flex-col justify-center py-8 gap-10">
      <div className="flex justify-center">
        <div className="flex gap-2 flex-1 justify-center ml-[105px] ">
          <Button href="/admin/upload">Go to upload CSV</Button>
          <Button href="/admin/logos">Go to check logos</Button>
        </div>
        <div className="ml-auto w-max">
          <LogoutButton />
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <CountsTable data={data} />
      </div>
    </div>
  );
};

export default Page;
