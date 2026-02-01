import type { FC } from 'react';
import NierAutoImage from './nierautoimage';

const Banner: FC = () => {
  return (
    <div className="relative h-[60vh] w-full">
        <NierAutoImage />
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-8 md:pl-16 lg:pl-24 xl:pl-32 text-left max-w-3xl h-full">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl tracking-tight">
          Web Development 2
        </h1>
        <p className="mt-5 text-sm md:text-2xl text-white/90 drop-shadow-lg max-w-3xl">
          Welcome to my CPRG-306-B Projects Web Application
        </p>
      </div>
    </div>
  );
};

export default Banner;