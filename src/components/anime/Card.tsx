import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/card.module.css'
import { AnimeInfoFragment } from '@generated/aniList';
import { base64SolidImage } from '@utility/image';
import { useRouter } from 'next/router';

export interface CardProps {
  anime: AnimeInfoFragment;
}

const Card: React.FC<CardProps> = ({ anime }) => {
  const title = anime.title.romaji || anime.title.english;
  const router = useRouter();

  return (
    <Link href={`/anime/${anime.id}`} passHref>
      <a className={styles.aniLink}>
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