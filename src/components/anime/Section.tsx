import React, { useRef } from 'react';

import AnimeCard from '@components/anime/Card';
import { AnimeInfoFragment } from '@generated/aniList';
import styles from '../../styles/Home.module.css'

export interface SectionProps {
  title: string;
  animeList: AnimeInfoFragment[];
}

const Section: React.FC<SectionProps> = ({ title, animeList }) => {
  const animeListRef = useRef(null);

  return (
    <div>
      <p className={styles.category}>
        {title}
      </p>

      <div
        tabIndex={0}
        className="mt-2 mb-8 ml-2 flex space-x-4 overflow-y-hidden overflow-x-scroll p-1 outline-none scrollbar-hide sm:ml-6"
        ref={animeListRef}
        onMouseEnter={() => animeListRef.current.focus()}
      >
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Section;
