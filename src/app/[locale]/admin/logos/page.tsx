import { getLogos } from '@/src/app/actions/actions';
import { Button } from '@/src/app/components/client/Button';
import { LogoutButton } from '@/src/app/components/client/LogoutButton';
import { LogoGrid } from '@/src/app/components/server/LogoGrid';
import { LeftChevronIcon } from '@/src/assets/icons';

export default async function LogosPage() {
  const { data } = await getLogos();

  console.log({ logos: data });

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <div className="flex justify-between">
        <Button className="w-max mb-5" href={'/admin'}>
          <LeftChevronIcon className="[&>path]:stroke-white" /> Back
        </Button>

        <LogoutButton />
      </div>

      <LogoGrid data={data.length > 0 ? data : []} />
    </div>
  );
}
