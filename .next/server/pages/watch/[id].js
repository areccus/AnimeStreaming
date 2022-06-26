"use strict";
(() => {
var exports = {};
exports.id = 209;
exports.ids = [209];
exports.modules = {

/***/ 8702:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2925);
/* harmony import */ var _utility_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2426);








const Card = ({ anime  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
        href: `/watch/${anime.id}`,
        passHref: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
            className: "ml-2 mr-4 flex transform space-x-4 py-2 text-white transition duration-300 ease-out hover:scale-105",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "aspect-h-1 aspect-w-3 relative w-24 flex-shrink-0",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                        alt: anime.title.english || anime.title.romaji,
                        src: anime.coverImage.large || anime.coverImage.medium,
                        layout: "fill",
                        objectFit: "cover",
                        className: "rounded-md",
                        placeholder: "blur",
                        blurDataURL: `data:image/svg+xml;base64,${(0,_utility_image__WEBPACK_IMPORTED_MODULE_7__/* .base64SolidImage */ .YE)(anime.coverImage.color)}`
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "line-clamp-1",
                            children: anime.title.english || anime.title.romaji
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-gray-400 line-clamp-2",
                            children: anime.description.replace(/<\w*\\?>/g, "")
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "m-4 flex justify-end space-x-2 text-xs text-white",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    icon: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_5__.PlayIcon,
                                    text: anime.format,
                                    className: "hidden sm:flex"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_4__.ClockIcon,
                                    text: `${anime.duration} Min`
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_4__.ThumbUpIcon,
                                    text: `${anime.meanScore}%`
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ 7981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _slices_episode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(961);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5162);




const PageButton = ({ start , end , onClick  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: onClick,
        className: "rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition duration-75 ease-out hover:bg-gray-800 active:scale-90",
        children: [
            start,
            "-",
            end
        ]
    });
};
const Episode = ()=>{
    const episodes = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__/* .useSelector */ .v9)((store)=>store.gogoApi.totalEpisodes
    );
    const dispatch = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__/* .useDispatch */ .I0)();
    const { 0: currentPage , 1: setPage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Show 100 episodes per page.
    // for 123 episodes there should be 2 pages
    const pages = Math.ceil(episodes / 100);
    const episodeArray = Array.from({
        length: episodes
    }, (_, i)=>i + 1
    );
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "m-2 flex",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-gray-300 md:text-lg",
                        children: "Go to episode: "
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        ref: inputRef,
                        className: "ml-2 w-32 rounded-sm p-1 text-sm text-gray-800 placeholder-gray-700 outline-none md:text-base",
                        placeholder: "Episode no.",
                        onKeyDown: (e)=>{
                            if (e.key !== "Enter") return;
                            dispatch((0,_slices_episode__WEBPACK_IMPORTED_MODULE_2__/* .setEpisode */ .RK)(parseInt(inputRef.current.value, 10)));
                            inputRef.current.value = "";
                        }
                    })
                ]
            }),
            episodes && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "m-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-lg text-gray-300",
                                children: "Episodes: "
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex flex-wrap space-x-2",
                                children: new Array(pages).fill(1).map((_v, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PageButton, {
                                        start: i * 100 + 1,
                                        end: i * 100 + 100 > episodes ? episodes : i * 100 + 100,
                                        onClick: ()=>setPage(i + 1)
                                    }, i + 1)
                                )
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "grid grid-cols-11 gap-x-2 gap-y-1 py-1 sm:grid-cols-[repeat(16,_minmax(0,_1fr))] lg:grid-cols-[repeat(20,_minmax(0,_1fr))] xl:grid-cols-[repeat(25,_minmax(0,_1fr))]",
                        children: episodeArray.slice((currentPage - 1) * 100, currentPage * 100).map((v)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "rounded-sm bg-gray-100 py-[1px] px-1 text-gray-800 hover:bg-gray-400",
                                onClick: ()=>dispatch((0,_slices_episode__WEBPACK_IMPORTED_MODULE_2__/* .setEpisode */ .RK)(v))
                                ,
                                children: v
                            }, v)
                        )
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Episode);


/***/ }),

/***/ 7434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_slices_videoSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5092);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5162);



const Toggler = ({ label , checked , action  })=>{
    const dispatch = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        className: "p2 relative mr-2 flex items-center justify-between text-white",
        children: [
            label,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "checkbox",
                checked: checked,
                onChange: ()=>dispatch(action)
                ,
                className: "peer absolute left-0 top-0 h-full w-full appearance-none"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: `
                  ml-2 flex h-5 w-9 flex-shrink-0 items-center
                  rounded-full bg-gray-300 p-1
                  after:h-4 after:w-4 after:rounded-full after:bg-gray-500 after:shadow-lg
                  after:duration-300 peer-checked:bg-red-500 peer-checked:after:translate-x-3 peer-checked:after:bg-gray-800
                `
            })
        ]
    });
};
const WatchControls = ()=>{
    const [useProxy, useDub] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)((store)=>[
            store.videoSettings.useProxy,
            store.videoSettings.useDub, 
        ]
    );
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "m-2 flex space-x-4",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Toggler, {
                label: "Use Proxy?",
                checked: useProxy,
                action: (0,_store_slices_videoSettings__WEBPACK_IMPORTED_MODULE_1__/* .toggleProxy */ .TH)()
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Toggler, {
                label: "Watch Dubbed?",
                checked: useDub,
                action: (0,_store_slices_videoSettings__WEBPACK_IMPORTED_MODULE_1__/* .toggleDub */ .ni)()
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WatchControls);


/***/ }),

/***/ 6968:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__]);
swr__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const useVideoSources = (id1, episode1, dub)=>{
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetcher = async (id, episode)=>fetch(`/api/anime/?id=${id}&episode=${episode}`).then((res)=>res.json()
        )
    ;
    const { data , error  } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])([
        id1,
        episode1
    ], fetcher, {
        revalidateOnFocus: false
    });
    return {
        sources: dub ? data === null || data === void 0 ? void 0 : data.dub.sources : data === null || data === void 0 ? void 0 : data.sub.sources,
        referer: dub ? data === null || data === void 0 ? void 0 : data.dub.Referer : data === null || data === void 0 ? void 0 : data.sub.Referer,
        episodes: data === null || data === void 0 ? void 0 : data.episodes,
        isLoading: !error && !data,
        isError: error
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useVideoSources);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2848:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6641);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Genre__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3108);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2730);
/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6937);
/* harmony import */ var _components_watch_Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8702);
/* harmony import */ var _components_watch_Episode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7981);
/* harmony import */ var _components_watch_WatchControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7434);
/* harmony import */ var _hooks_useVideoSources__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6968);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9113);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8442);
/* harmony import */ var _slices_anime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2744);
/* harmony import */ var _slices_episode__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(961);
/* harmony import */ var _slices_gogoApi__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(705);
/* harmony import */ var _slices_videoSettings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5092);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(5162);
/* harmony import */ var _utility_time__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(533);
/* harmony import */ var _utility_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3305);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useVideoSources__WEBPACK_IMPORTED_MODULE_11__]);
_hooks_useVideoSources__WEBPACK_IMPORTED_MODULE_11__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





















const VideoPlayer = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(null, {
    loadableGenerated: {
        modules: [
            "watch/[id].tsx -> " + "@components/watch/VideoPlayer"
        ]
    },
    ssr: false
});
const getServerSideProps = async (context)=>{
    const store = (0,_store_store__WEBPACK_IMPORTED_MODULE_17__/* .initialiseStore */ .lE)();
    const { id  } = context.params;
    const { episode  } = context.query;
    store.dispatch((0,_slices_anime__WEBPACK_IMPORTED_MODULE_13__/* .setAnime */ .v9)(parseInt((0,_utility_utils__WEBPACK_IMPORTED_MODULE_18__/* .arrayToString */ .Nj)(id), 10)));
    if (episode) {
        store.dispatch((0,_slices_episode__WEBPACK_IMPORTED_MODULE_14__/* .setEpisode */ .RK)(parseInt((0,_utility_utils__WEBPACK_IMPORTED_MODULE_18__/* .arrayToString */ .Nj)(episode), 10)));
    }
    const data = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_12__/* .watchPage */ .Av)({
        id: parseInt((0,_utility_utils__WEBPACK_IMPORTED_MODULE_18__/* .arrayToString */ .Nj)(id), 10),
        perPage: 20
    });
    const recommended = data.recommended.recommendations.map((anime)=>anime.mediaRecommendation
    );
    return {
        props: {
            anime: data.anime,
            recommended,
            initialReduxState: store.getState()
        }
    };
};
const Watch = ({ anime , recommended  })=>{
    // finish the progress bar
    _components_Progress__WEBPACK_IMPORTED_MODULE_7__/* ["default"].finish */ .Z.finish();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const dispatch = (0,_store_store__WEBPACK_IMPORTED_MODULE_17__/* .useDispatch */ .I0)();
    const [animeId, episode] = (0,_store_store__WEBPACK_IMPORTED_MODULE_17__/* .useSelector */ .v9)((store)=>[
            store.anime.anime,
            store.episode.episode, 
        ]
    );
    const { useDub , useProxy  } = (0,_store_store__WEBPACK_IMPORTED_MODULE_17__/* .useSelector */ .v9)((store)=>store.videoSettings
    );
    const videoLink = (0,_store_store__WEBPACK_IMPORTED_MODULE_17__/* .useSelector */ .v9)((store)=>store.gogoApi.videoLink
    );
    const routerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(router);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // only run when the initial episode value was not supplied
        if (routerRef.current.query.episode) return;
        // get the saved episode
        const savedState = localStorage.getItem(`Anime${animeId}`) || "1-0";
        const savedEpisode = savedState.split("-").map((v)=>parseInt(v, 10)
        )[0];
        // update the episode
        dispatch((0,_slices_episode__WEBPACK_IMPORTED_MODULE_14__/* .setEpisode */ .RK)(savedEpisode));
    }, [
        animeId,
        dispatch
    ]);
    // update the router url
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        routerRef.current.replace({
            pathname: "/watch/[id]",
            query: {
                id: animeId,
                episode
            }
        }, `/watch/${animeId}/?episode=${episode}`, {
            shallow: true
        });
    }, [
        animeId,
        episode
    ]);
    // get the videolink, episode of the anime
    const { sources , referer , isError , isLoading , episodes  } = (0,_hooks_useVideoSources__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(animeId, episode, useDub);
    // set the videosources
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isLoading) {
            dispatch((0,_slices_gogoApi__WEBPACK_IMPORTED_MODULE_15__/* .resetSources */ .XC)());
        }
        dispatch((0,_slices_gogoApi__WEBPACK_IMPORTED_MODULE_15__/* .setSources */ .ed)(sources));
    }, [
        dispatch,
        isLoading,
        sources
    ]);
    // set the total episodes the animes has
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isLoading) return;
        dispatch((0,_slices_gogoApi__WEBPACK_IMPORTED_MODULE_15__/* .setTotalEpisodes */ .j5)(episodes));
    }, [
        dispatch,
        episodes,
        isLoading
    ]);
    // set the should use proxy by matching regex
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isLoading) return;
        dispatch((0,_slices_videoSettings__WEBPACK_IMPORTED_MODULE_16__/* .setProxy */ .pL)(!videoLink.match(_lib_constants__WEBPACK_IMPORTED_MODULE_19__/* .proxyFreeUrls */ .O8)));
    }, [
        dispatch,
        isLoading,
        videoLink
    ]);
    // get data about next airing episode
    const { nextAiringEpisode  } = anime;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_seo__WEBPACK_IMPORTED_MODULE_4__.NextSeo, {
                title: `${anime.title.romaji || anime.title.english} | Episode ${episode}`,
                description: anime.description,
                openGraph: {
                    images: [
                        {
                            type: "large",
                            url: anime.bannerImage,
                            alt: `Banner Image for ${anime.title.english || anime.title.romaji}`
                        },
                        {
                            url: anime.coverImage.large || anime.coverImage.medium,
                            alt: `Cover Image for ${anime.title.english || anime.title.romaji}`
                        }, 
                    ]
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-x-4 sm:mt-4 lg:flex",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mx-auto max-w-[800px] flex-shrink-0 sm:p-4 lg:mx-0 lg:ml-4 lg:w-[65%] lg:max-w-full lg:p-0",
                        children: [
                            !isError ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(VideoPlayer, {
                                src: useProxy ? (0,_utility_utils__WEBPACK_IMPORTED_MODULE_18__/* .proxyUrl */ .qy)(videoLink, referer) : videoLink,
                                poster: anime.bannerImage
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-4 ml-3 text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                                children: "Sorry, the anime video couldn't be found"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex w-full items-center justify-between",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "m-2 mt-4 text-base font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                                    children: `${anime.title.romaji || anime.title.english}${anime.format !== "MOVIE" ? ` | Episode ${episode}` : ""}`
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mx-3 flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-2",
                                children: anime.genres.map((genre)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Genre__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                        genre: genre
                                    }, genre)
                                )
                            }),
                            nextAiringEpisode ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-2 p-2 text-gray-400",
                                children: [
                                    anime.title.romaji || anime.title.english,
                                    " Episode",
                                    " ",
                                    nextAiringEpisode.episode,
                                    " will release on the",
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "inline-block font-bold text-gray-400",
                                        children: [
                                            (0,_utility_time__WEBPACK_IMPORTED_MODULE_20__/* .convertToDate */ .k)(nextAiringEpisode.airingAt * 1000),
                                            "."
                                        ]
                                    }),
                                    " ",
                                    "Further episodes of the anime will air every",
                                    " ",
                                    (0,_utility_time__WEBPACK_IMPORTED_MODULE_20__/* .convertToTime */ .R)(nextAiringEpisode.airingAt * 1000),
                                    "."
                                ]
                            }) : null,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_watch_WatchControls__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_watch_Episode__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "m-2 text-gray-400 line-clamp-6 md:line-clamp-none",
                                children: anime.description.replace(/<\w*\\?>/g, "")
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mx-auto",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-base font-semibold text-white sm:text-lg md:text-xl lg:mt-0 lg:text-2xl xl:text-3xl 2xl:text-4xl",
                                children: "Recommended animes"
                            }),
                            recommended.map((recommendation)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_watch_Card__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                    anime: recommendation
                                }, recommendation.id)
                            )
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Watch);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ convertToTime),
/* harmony export */   "k": () => (/* binding */ convertToDate)
/* harmony export */ });
const nth = (days)=>{
    if (days > 3 && days < 21) return "th";
    switch(days % 10){
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};
const convertToDate = (date)=>{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString("en-us", {
        month: "short"
    });
    const day = dateObj.getDate();
    return `${day}${nth(day)} of ${month} ${year}`;
};
const convertToTime = (date)=>{
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday", 
    ];
    const dateObj = new Date(date);
    const day = weekday[dateObj.getDay()];
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${day} at ${hours}:${minutes} ${ampm} (GMT-4)`;
    return strTime;
};


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

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

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

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

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

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,61,152,352,532,162], () => (__webpack_exec__(2848)));
module.exports = __webpack_exports__;

})();