import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PlayIcon } from '@heroicons/react/solid';

import Genre from '@components/Genre';
import progressBar from '@components/Progress';
import { AnimeBannerFragment } from '@generated/aniList';
import { stripHtml } from '@utility/utils';

export interface BannerProps {
  anime: AnimeBannerFragment;
}

const Banner: React.FC<BannerProps> = ({ anime }) => {
  const router = useRouter();

  // finish the progress bar if the bannerimage doesn't exist
  useEffect(() => {
    if (!anime.bannerImage) progressBar.finish();
  }, [anime.bannerImage]);

  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]" style={{ width: '90vw', height: '50vh', border: '3px solid #d5dbdb', borderRadius: '2px' }}>
      <div className='banner-inner-div'>
      {/* The image behind the banner */}
      {anime.bannerImage && (
        <Image
          priority
          src={anime.bannerImage}
          alt={`Banner for ${anime.title.english || anime.title.romaji}`}
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          onLoadingComplete={progressBar.finish}
        />
      )}

      {/* The container that lies on top of the image */}
      <div className="absolute ml-4 mt-4 space-y-2 text-white sm:ml-8 sm:mt-6 md:space-y-3 lg:mt-8 xl:mt-10 2xl:mt-12">
        {/* the title */}
        <p className="text-xl font-extrabold line-clamp-1 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl" style={{ marginTop: '8%' }}>
          {anime.title.romaji || anime.title.english}
        </p>

        {/* Array of the genres */}
        <div className="mr-2 flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-3 md:gap-x-4">
          {anime.genres.map((genre) => (
            <Genre key={genre} genre={genre} />
          ))}
        </div>

        <p className="hidden max-w-3xl md:block md:line-clamp-2 lg:line-clamp-3 xl:line-clamp-4 2xl:line-clamp-5">
          {stripHtml(anime.description)}
        </p>

        {/* the button at the bottom */}
        <Link
          href={`/${router.route === '/' ? 'anime' : 'watch'}/${anime.id}`}
          passHref
        >
          <a>
            <button className="mt-2 flex transform items-center rounded-lg bg-[#C3073F] px-2 py-1 text-xs text-white transition duration-300 ease-in active:scale-90 sm:text-sm md:text-base">
              <PlayIcon className="mr-1 w-5" />
              {router.route === '/' ? 'Read More' : 'Watch Now'}
            </button>
          </a>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Banner;
