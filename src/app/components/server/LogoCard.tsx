import Image from 'next/image';

type LogoCardProps = {
  logo?: string | null;
  brandName?: string;
};

export function LogoCard({ logo, brandName }: LogoCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="relative w-48 h-24">
        <Image
          src={logo?.startsWith('http') ? logo : `https:${logo}` || ''}
          alt={brandName ?? ''}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold text-purple-900">{brandName}</h3>
    </div>
  );
}
