import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css'
import { SearchIcon } from '@heroicons/react/outline';

import AnimeflixIcon from '@components/AnimeFlixIcon';

const Header: React.FC<{}> = () => {
  const router = useRouter();

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === 'Enter')
      router.push(`/search?keyword=${event.currentTarget.value}`);
  };

  return (
    <header className="sticky top-0 z-[51] flex h-12 w-full items-center bg-gray-900 shadow-md" style={{ background: 'transparent', display: 'flex', alignItems: 'center', margin: '2px', padding: '2% 0'}}>
      <Link href="/" passHref>
        <a>
          <AnimeflixIcon className="ml-4 h-7 w-7 cursor-pointer sm:ml-6" />
        </a>
      </Link>
      <div className={styles.searchDiv}>
        <SearchIcon className="h-4 w-7" />
        <input
          className="w-44 bg-transparent p-1 text-sm text-black placeholder-gray-400 outline-none sm:w-56 md:w-64 lg:w-72"
          placeholder="Search for Anime to watch"
          onKeyPress={handleKeyPress}
        ></input>
      </div>
    </header>
  );
};

export default Header;
