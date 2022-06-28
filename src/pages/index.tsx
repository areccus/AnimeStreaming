import { useEffect, useState } from 'react';

import { InferGetServerSidePropsType } from 'next';
import Banner from '@components/anime/Banner';
import Section from '@components/anime/Section';
import Header from '@components/Header';
import progressBar from '@components/Progress';
import { AnimeInfoFragment } from '@generated/aniList';
import { getAnimeByIds, indexPage } from '@lib/api';

export const getServerSideProps = async () => {
  const data = await indexPage({
    perPage: 8,
    page: 1,
    seasonYear: new Date().getFullYear(),
  });
  return {
    props: {
      ...data,
    },
  };
};

const Index = ({
  banner,
  trending,
  popular,
  topRated,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // finish the progress bar
  progressBar.finish();

  const [recentlyWatched, setRecentlyWatched] = useState<AnimeInfoFragment[]>(
    []
  );

  // populate recentlyWatched
  useEffect(() => {
    const ids = Object.keys(localStorage)
      .filter((key) => key.startsWith('Anime'))
      .map((key) => parseInt(key.replace('Anime', ''), 10));

    getAnimeByIds({
      perPage: 12,
      page: 1,
      ids,
    }).then((data) => setRecentlyWatched(data.Page.media));
  }, []);
  console.log(banner)
  return (
    <>
      <Header />
      <div className="banner" style={{ display: 'flex', justifyContent: 'center' }}>
      <Banner anime={banner} />
      </div>

      <Section title="Trending" animeList={trending.media} />

      {/* only show */}
      {recentlyWatched.length > 0 ? (
        <Section title="Continue watching" animeList={recentlyWatched} />
      ) : null}

      <Section title="Popular" animeList={popular.media} />
      <Section title="Top Rated" animeList={topRated.media} />
    </>
  );
};

export default Index;
