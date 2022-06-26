"use strict";
exports.id = 509;
exports.ids = [509];
exports.modules = {

/***/ 4737:
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Genre__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3108);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2925);
/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6937);
/* harmony import */ var _utility_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3305);











const Banner = ({ anime  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    // finish the progress bar if the bannerimage doesn't exist
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!anime.bannerImage) _components_Progress__WEBPACK_IMPORTED_MODULE_9__/* ["default"].finish */ .Z.finish();
    }, [
        anime.bannerImage
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]",
        children: [
            anime.bannerImage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                priority: true,
                src: anime.bannerImage,
                alt: `Banner for ${anime.title.english || anime.title.romaji}`,
                layout: "fill",
                objectFit: "cover",
                className: "opacity-60",
                onLoadingComplete: _components_Progress__WEBPACK_IMPORTED_MODULE_9__/* ["default"].finish */ .Z.finish
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute ml-4 mt-4 space-y-2 text-white sm:ml-8 sm:mt-6 md:space-y-3 lg:mt-8 xl:mt-10 2xl:mt-12",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-xl font-extrabold line-clamp-1 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
                        children: anime.title.romaji || anime.title.english
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-sm font-normal text-gray-300 line-clamp-1 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
                        children: anime.title.english ?? anime.title.romaji
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                icon: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_6__.PlayIcon,
                                text: anime.format
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_5__.ClockIcon,
                                text: `${anime.duration} Min/Ep`
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Icon__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_5__.ThumbUpIcon,
                                text: `${anime.meanScore}%`
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mr-2 flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-3 md:gap-x-4",
                        children: anime.genres.map((genre)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Genre__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                genre: genre
                            }, genre)
                        )
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "hidden max-w-3xl md:block md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5 2xl:line-clamp-6",
                        children: (0,_utility_utils__WEBPACK_IMPORTED_MODULE_10__/* .stripHtml */ .Vt)(anime.description)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: `/${router.route === "/" ? "anime" : "watch"}/${anime.id}`,
                        passHref: true,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "mt-2 flex transform items-center rounded-lg bg-[#C3073F] px-2 py-1 text-xs text-white transition duration-300 ease-in active:scale-90 sm:text-sm md:text-base",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_6__.PlayIcon, {
                                        className: "mr-1 w-5"
                                    }),
                                    router.route === "/" ? "Read More" : "Watch Now"
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Banner);


/***/ }),

/***/ 9759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_anime_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3998);



const Section = ({ title , animeList  })=>{
    const animeListRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "mt-4 ml-3 text-base font-semibold text-white sm:ml-6 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
                style: {
                    fontSize: "1.6vw"
                },
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                tabIndex: 0,
                className: "mt-2 mb-8 ml-2 flex space-x-4 overflow-y-hidden overflow-x-scroll p-1 outline-none scrollbar-hide sm:ml-6",
                ref: animeListRef,
                onMouseEnter: ()=>animeListRef.current.focus()
                ,
                children: animeList.map((anime)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_anime_Card__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        anime: anime
                    }, anime.id)
                )
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);


/***/ })

};
;