import React, { useRef } from 'react';

import EpisodeCard from '@components/anime/Episode';
import { AnimeBannerFragment } from '@generated/aniList';
import { EpisodesListFragment } from '@generated/kitsu';
import styles from '../../styles/episodes.module.css'

export interface SectionProps {
  anime: AnimeBannerFragment;
  episodes: EpisodesListFragment;
}

const Section: React.FC<SectionProps> = ({ anime, episodes }) => {
  const animeListRef = useRef(null);

  return (
    <div style={{ marginLeft: '4%' }}>
      <div className={styles.episodeP}>
      <p>
        Episodes
      </p>

      {/* <p>
        Recommendations
      </p> */}
      </div>

      <div
        tabIndex={0}
        className={styles.episodes}
        ref={animeListRef}
        onMouseEnter={() => animeListRef.current.focus()}
      >
        {new Array(episodes.episodeCount > 8 ? 8 : episodes.episodeCount)
          .fill(1)
          .map((_v, i) => (
            <EpisodeCard
              key={i + 1}
              anime={anime}
              number={i + 1}
              episode={episodes.episodes.nodes[i]}
            />
          ))}
      </div>
    </div>
  );
};

export default Section;
