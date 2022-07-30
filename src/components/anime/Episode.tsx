import Image from 'next/image';
import Link from 'next/link';

import { AnimeBannerFragment, AnimeInfoFragment } from '@generated/aniList';
import { EpisodeInfoFragment } from '@generated/kitsu';
import styles from '../../styles/episodes.module.css'

export interface CardProps {
  anime: AnimeBannerFragment & AnimeInfoFragment;
  number: number;
  episode?: EpisodeInfoFragment | null;
}

const Card: React.FC<CardProps> = ({ anime, number, episode }) => {
  const title = episode ? episode.titles.canonical : `Episode No. ${number}`;

  return (
    <Link href={`/watch/${anime.id}?episode=${number}`} passHref>
      <a className={styles.episode}>
        <div className="relative">
          <div className={styles.episodeDiv}>
            <Image
              alt="Cover Image"
              src={
                (episode && episode.thumbnail?.original.url) ||
                anime.coverImage.large ||
                anime.coverImage.medium ||
                anime.bannerImage
              }
              objectFit="cover"
              layout="fill"
              objectPosition="center"
              className="rounded-md"
            />
          </div>
          {/* <p className="absolute top-0 right-0 mt-2 h-12 text-xl font-bold text-white">
            {number}
          </p> */}
        </div>

        <div>
          <p className={styles.number}>
            {title}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default Card;
