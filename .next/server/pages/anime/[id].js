"use strict";
(() => {
var exports = {};
exports.id = 609;
exports.ids = [609];
exports.modules = {

/***/ 3554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _id_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@heroicons/react/solid"
var solid_ = __webpack_require__(1143);
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__(6641);
// EXTERNAL MODULE: ./src/components/anime/Banner.tsx
var Banner = __webpack_require__(4737);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/components/anime/Episode.tsx



const Card = ({ anime , number , episode  })=>{
    var ref;
    const title = episode ? episode.titles.canonical : `Episode No. ${number}`;
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: `/watch/${anime.id}?episode=${number}`,
        passHref: true,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
            className: "w-64 transform cursor-pointer p-2 transition duration-300 ease-out hover:scale-105 sm:w-80",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "aspect-w-3 aspect-h-2 relative w-64 sm:w-80",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                alt: "Cover Image",
                                src: episode && ((ref = episode.thumbnail) === null || ref === void 0 ? void 0 : ref.original.url) || anime.coverImage.large || anime.coverImage.medium || anime.bannerImage,
                                objectFit: "cover",
                                layout: "fill",
                                objectPosition: "center",
                                className: "rounded-md"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "absolute top-0 right-0 mt-2 h-12 text-xl font-bold text-white",
                            children: number
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mt-2 text-sm font-bold text-white line-clamp-2",
                        children: title
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const Episode = (Card);

;// CONCATENATED MODULE: ./src/components/anime/EpisodeSection.tsx



const Section = ({ anime , episodes  })=>{
    const animeListRef = (0,external_react_.useRef)(null);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "mt-4 ml-3 text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                children: "Episodes"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                tabIndex: 0,
                className: "mt-2 mb-8 ml-3 flex space-x-4 overflow-y-hidden overflow-x-scroll outline-none scrollbar-hide sm:ml-6",
                ref: animeListRef,
                onMouseEnter: ()=>animeListRef.current.focus()
                ,
                children: new Array(episodes.episodeCount > 8 ? 8 : episodes.episodeCount).fill(1).map((_v, i)=>/*#__PURE__*/ jsx_runtime_.jsx(Episode, {
                        anime: anime,
                        number: i + 1,
                        episode: episodes.episodes.nodes[i]
                    }, i + 1)
                )
            })
        ]
    });
};
/* harmony default export */ const EpisodeSection = (Section);

// EXTERNAL MODULE: ./src/components/anime/Section.tsx
var anime_Section = __webpack_require__(9759);
// EXTERNAL MODULE: ./src/components/Header.tsx + 1 modules
var Header = __webpack_require__(2730);
// EXTERNAL MODULE: ./src/generated/aniList.ts
var aniList = __webpack_require__(114);
// EXTERNAL MODULE: ./src/lib/api.ts + 1 modules
var api = __webpack_require__(9113);
;// CONCATENATED MODULE: ./src/pages/anime/[id].tsx









const getServerSideProps = async (context)=>{
    let { id  } = context.params;
    id = typeof id === "string" ? id : id.join(" ");
    const data = await (0,api/* animePage */.o1)({
        id: parseInt(id, 10),
        perPage: 12
    });
    if (!data.Media) {
        return {
            notFound: true
        };
    }
    let episodes = {
        episodeCount: 0,
        episodes: null
    };
    // dont fetch episodes if the anime hasn't released
    if (data.Media.status !== aniList/* MediaStatus.NotYetReleased */.Jp.NotYetReleased) {
        // fetch episode list
        const { title , startDate , season  } = data.Media;
        const english = (0,api/* getKitsuEpisodes */.GJ)(title.english, season, startDate.year);
        const romaji = (0,api/* getKitsuEpisodes */.GJ)(title.romaji, season, startDate.year);
        episodes = await Promise.all([
            english,
            romaji
        ]).then((r)=>{
            return r[0].episodeCount > 0 ? r[0] : r[1];
        });
    }
    return {
        props: {
            anime: data.Media,
            recommended: data.recommended.recommendations.map((r)=>r.mediaRecommendation
            ),
            episodes
        }
    };
};
const Anime = ({ anime , recommended , episodes  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_next_seo_.NextSeo, {
                title: `${anime.title.romaji || anime.title.english} | Animeflix`,
                description: anime.description,
                openGraph: {
                    images: [
                        {
                            type: "large",
                            url: anime.bannerImage,
                            alt: `Banner Image for ${anime.title.english || anime.title.romaji}`
                        },
                        {
                            type: "small",
                            url: anime.coverImage.large || anime.coverImage.medium,
                            alt: `Cover Image for ${anime.title.english || anime.title.romaji}`
                        }, 
                    ]
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Banner/* default */.Z, {
                anime: anime
            }),
            anime.format !== "MOVIE" && episodes.episodeCount > 0 && /*#__PURE__*/ jsx_runtime_.jsx(EpisodeSection, {
                anime: anime,
                episodes: episodes
            }),
            anime.format !== "MOVIE" && episodes.episodeCount === 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "mt-4 ml-3 flex items-center justify-center text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                children: [
                    "no episodes found",
                    /*#__PURE__*/ jsx_runtime_.jsx(solid_.EmojiSadIcon, {
                        className: "w-8"
                    })
                ]
            }),
            recommended.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(anime_Section/* default */.Z, {
                animeList: recommended,
                title: "Recommended"
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "mt-4 ml-3 flex items-center justify-center text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                children: [
                    "no recommendations found",
                    /*#__PURE__*/ jsx_runtime_.jsx(solid_.EmojiSadIcon, {
                        className: "w-8"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const _id_ = (Anime);


/***/ }),

/***/ 5191:
/***/ ((module) => {

module.exports = require("@badrap/bar-of-progress");

/***/ }),

/***/ 8768:
/***/ ((module) => {

module.exports = require("@heroicons/react/outline");

/***/ }),

/***/ 1143:
/***/ ((module) => {

module.exports = require("@heroicons/react/solid");

/***/ }),

/***/ 5805:
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ 825:
/***/ ((module) => {

module.exports = require("graphql-tag");

/***/ }),

/***/ 6641:
/***/ ((module) => {

module.exports = require("next-seo");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,61,352,998,532,509], () => (__webpack_exec__(3554)));
module.exports = __webpack_exports__;

})();