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
    <Link href={`/anime/${anime.id}`} passHref>
      <a className="w-46 transform p-2 transition duration-300 ease-out hover:scale-105 sm:w-56 anime-link" style={{ margin: '0' }}>
        <div className="aspect-w-7 aspect-h-9 relative w-40 sm:w-52" style={{ position: 'relative', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000', height: '60vh' }}>
          <Image
            alt="Cover Image"
            src={anime.coverImage.large || anime.coverImage.medium}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-md"
            placeholder="blur"
            style={{ borderRadius: '0' }}
            blurDataURL={`data:image/svg+xml;base64,${base64SolidImage(
              anime.coverImage.color
            )}`}
          />
          <div className='cardTitle' style={{ position: 'absolute', fontSize: '1.2vw', display: 'flex' }}>
          <p className="mt-2 h-9 text-sm font-bold text-white line-clamp-2" style={{ alignSelf: 'flex-end', marginLeft: '2%', marginBottom: '1%' }}>
          {title}
          </p>
          </div>
        </div>

      </a>
    </Link>
  );
};

export default Card;
