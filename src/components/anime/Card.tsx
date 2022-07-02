import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/Home.module.css'
import { AnimeInfoFragment } from '@generated/aniList';
import { base64SolidImage } from '@utility/image';

export interface CardProps {
  anime: AnimeInfoFragment;
}

const Card: React.FC<CardProps> = ({ anime }) => {
  const title = anime.title.romaji || anime.title.english;

  return (
    <Link href={`/anime/${anime.id}`} passHref style={styles}>
      <a className="w-46 transform p-2 transition duration-300 ease-out hover:scale-105 sm:w-56 anime-link" style={{ margin: '0' }}>
        <div className={styles.aspect7}>
          <Image
            alt="Cover Image"
            src={anime.coverImage.large || anime.coverImage.medium}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={styles.cardIMG}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${base64SolidImage(
              anime.coverImage.color
            )}`}
          />
          <div className={styles.cardTitle}>
          <p className="mt-2 h-9 text-sm font-bold text-white line-clamp-2">
          {title}
          </p>
          </div>
        </div>

      </a>
    </Link>
  );
};

export default Card;