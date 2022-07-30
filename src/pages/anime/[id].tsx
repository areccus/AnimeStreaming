import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { EmojiSadIcon } from '@heroicons/react/solid';
import { NextSeo } from 'next-seo';

import Banner from '@components/anime/Banner';
import EpisodeSection from '@components/anime/EpisodeSection';
import Section from '@components/anime/Section';
import Header from '@components/Header';
import styles from '../../styles/episodes.module.css'

import {
  AnimeBannerFragment,
  AnimeInfoFragment,
  MediaStatus,
} from '@generated/aniList';
import { EpisodesListFragment } from '@generated/kitsu';
import { animePage, getKitsuEpisodes } from '@lib/api';
import { url } from 'inspector';
import anime from '@store/slices/anime';

const Vibrant = require('node-vibrant');

interface AnimeProps {
  anime: AnimeInfoFragment & AnimeBannerFragment;
  recommended: AnimeInfoFragment[];
  episodes: EpisodesListFragment;
}

export const getServerSideProps: GetServerSideProps<AnimeProps> = async (
  context
) => {
  let { id } = context.params;

  id = typeof id === 'string' ? id : id.join(' ');

  const data = await animePage({
    id: parseInt(id, 10),
    perPage: 12,
  });

  if (!data.Media) {
    return {
      notFound: true,
    };
  }

  let episodes: EpisodesListFragment = {
    episodeCount: 0,
    episodes: null,
  };

  // dont fetch episodes if the anime hasn't released
  if (data.Media.status !== MediaStatus.NotYetReleased) {
    // fetch episode list
    const { title, startDate, season } = data.Media;
    const english = getKitsuEpisodes(title.english, season, startDate.year);
    const romaji = getKitsuEpisodes(title.romaji, season, startDate.year);
    episodes = await Promise.all([english, romaji]).then((r) => {
      return r[0].episodeCount > 0 ? r[0] : r[1];
    });
  }

  return {
    props: {
      anime: data.Media,
      recommended: data.recommended.recommendations.map(
        (r) => r.mediaRecommendation
      ),
      episodes,
    },
  };
};

const Anime = ({
  anime,
  recommended,
  episodes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  function changeBackground(color) {
    document.getElementById('background').style.background = color
 }

  const img = anime.bannerImage
  let vibrant = Vibrant.from(img).getPalette()
  .then((palette) => {
    let bgColor = palette.Vibrant.rgb
    function rgb(values) {
      return 'rgb(' + values.join(', ') + ', 0.3)';
  }
    console.log(rgb(bgColor))
    changeBackground(`${rgb(bgColor)}`);
  })


  return (
    <div className={styles.background} id='background'>
      <img className={styles.bgIMG} src={anime.bannerImage} alt="" />
      <div className={styles.glass}></div>
      <NextSeo
        title={`${anime.title.romaji || anime.title.english} | Animeflix`}
        description={anime.description}
        openGraph={{
          images: [
            {
              type: 'large',
              url: anime.bannerImage,
              alt: `Banner Image for ${
                anime.title.english || anime.title.romaji
              }`,
            },
            {
              type: 'small',
              url: anime.coverImage.large || anime.coverImage.medium,
              alt: `Cover Image for ${
                anime.title.english || anime.title.romaji
              }`,
            },
          ],
        }}
      />

      <Header />
      <Banner anime={anime} />

      {/* Don't show episode section if format is movie */}
      {anime.format !== 'MOVIE' && episodes.episodeCount > 0 && (
        <EpisodeSection anime={anime} episodes={episodes} />
      )}

      {anime.format !== 'MOVIE' && episodes.episodeCount === 0 && (
        <p className="mt-4 ml-3 flex items-center justify-center text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          no episodes found
          <EmojiSadIcon className="w-8" />
        </p>
      )}

      {/* {recommended.length > 0 ? (
        <Section animeList={recommended} title="Recommended" />
      ) : (
        <p className="mt-4 ml-3 flex items-center justify-center text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          no recommendations found
          <EmojiSadIcon className="w-8" />
        </p>
      )} */}
    </div>
  );
};

export default Anime;
