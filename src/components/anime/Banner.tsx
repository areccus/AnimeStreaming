import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../../styles/banner.module.css'

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
    <div className={router.route === '/' ? `${styles.bannerContainer}` : `${styles.aniBanner}`}>
      <div className={styles.innerDiv}>
      {/* The image behind the banner */}
      <img src={anime.bannerImage} alt="" className={styles.banner_image}/>
      <div className={router.route === '/' ? `${styles.bannerOverlay}` : `${styles.aniOverlay}`}></div>
      {/* The container that lies on top of the image */}
      <div className={router.route === '/' ? `${styles.textContainer}` : `${styles.aniText}`}> 
        {/* the title */}
        <h2 className={styles.anititle}>
          {anime.title.romaji || anime.title.english}
        </h2>

        {/* Array of the genres */}
        <div className={router.route === '/' ? `${styles.genreContainer}` : `${styles.aniGenre}`}>
          {anime.genres.map((genre) => (
            <Genre key={genre} genre={genre} />
          ))}
        </div>
        <div className='descContainer'>
        <h3>SUMMARY:</h3>
        <p className={router.route === '/' ? `${styles.description}` : `${styles.aniDesc}`}>
          {stripHtml(anime.description)}
        </p>
        </div>

        {/* the button at the bottom */}
        {/* <Link
          href={`/${router.route === '/' ? 'anime' : 'watch'}/${anime.id}`}
          passHref
        >
          <a>
            <button className="mt-2 flex transform items-center rounded-lg bg-[#C3073F] px-2 py-1 text-xs text-white transition duration-300 ease-in active:scale-90 sm:text-sm md:text-base">
              <PlayIcon className="mr-1 w-5" />
              {router.route === '/' ? 'Read More' : 'Watch Now'}
            </button>
          </a>
        </Link> */}
      </div>
      </div>
    </div>
  );
};

export default Banner;
