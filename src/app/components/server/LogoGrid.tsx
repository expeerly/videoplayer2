import { Brand } from '@/src/db/types';
import { LogoCard } from './LogoCard';

type LogoGridProps = {
  data: Partial<Brand>[];
};

export function LogoGrid({ data = [] }: LogoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data?.map(i => <LogoCard key={i.brandName} logo={i.logo} brandName={i.brandName} />)}
    </div>
  );
}
