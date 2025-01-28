import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center text-center">
      <title>404: This page could not be found</title>

      <Image
        alt="Expeerly Logo"
        src={'/expeerly-logo.svg'}
        width={300}
        height={300}
        className="mb-5"
      />
      <p className="font-bold-purple text-2xl text-[#2C1277]">This page could not be found.</p>
      <p className="font-bold-purple text-2xl text-[#2C1277]">
        Please go to{' '}
        <Link href="/" className="text-blue-500 underline">
          www.expeerly.com
        </Link>{' '}
        to see all our videos
      </p>
    </div>
  );
};

export default NotFound;
