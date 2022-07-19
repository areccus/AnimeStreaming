import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/card.module.css'

export interface GenreProps {
  genre: string;
}


const Genre: React.FC<GenreProps> = ({ genre }) => {
  const router = useRouter();
  return (
    <Link href={`/genre/${genre}`} passHref>
      <a className={router.route === '/' ? "transform rounded bg-black p-1 text-xs text-white transition duration-300 ease-out hover:scale-105 sm:text-sm" : `${styles.genres}`}>
        {genre}
      </a>
    </Link>
  );
};

export default Genre;
