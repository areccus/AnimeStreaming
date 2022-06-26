"use strict";
exports.id = 162;
exports.ids = [162];
exports.modules = {

/***/ 2744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "v9": () => (/* binding */ setAnime)
/* harmony export */ });
/* unused harmony export animeSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-param-reassign */ 
const initialState = {
    anime: 1
};
const animeSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "anime",
    initialState,
    reducers: {
        setAnime: (state, action)=>{
            state.anime = action.payload;
        }
    }
});
const { setAnime  } = animeSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animeSlice.reducer);


/***/ }),

/***/ 961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RK": () => (/* binding */ setEpisode),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports episodeSlice, decrementEpisode, incrementEpisode */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-param-reassign */ 
const initialState = {
    episode: 1
};
const episodeSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "episode",
    initialState,
    reducers: {
        incrementEpisode: (state)=>{
            state.episode += 1;
        },
        decrementEpisode: (state)=>{
            if (!(state.episode <= 1)) state.episode -= 1;
        },
        setEpisode: (state, action)=>{
            state.episode = action.payload;
        }
    }
});
const { decrementEpisode , incrementEpisode , setEpisode  } = episodeSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (episodeSlice.reducer);


/***/ }),

/***/ 705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XC": () => (/* binding */ resetSources),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ed": () => (/* binding */ setSources),
/* harmony export */   "j5": () => (/* binding */ setTotalEpisodes)
/* harmony export */ });
/* unused harmony exports gogoApiSlice, setCurrentSource */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-param-reassign */ 
const initialState = {
    totalEpisodes: 1,
    sources: [
        {
            file: "https://example.com/404"
        }, 
    ],
    currentSource: 0,
    videoLink: "https://example.com/404"
};
const gogoApiSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "gogoApi",
    initialState,
    reducers: {
        setTotalEpisodes: (state, action)=>{
            state.totalEpisodes = action.payload;
        },
        setCurrentSource: (state, action)=>{
            if (action.payload < state.sources.length) return;
            state.currentSource = action.payload;
            state.videoLink = state.sources[state.currentSource].file;
        },
        setSources: (state, action)=>{
            if (!action.payload || action.payload.length === 0) {
                state.sources = initialState.sources;
            } else {
                state.sources = action.payload;
            }
            state.currentSource = 0;
            state.videoLink = state.sources[state.currentSource].file;
        },
        resetSources: (state)=>{
            state.sources = initialState.sources;
            state.currentSource = initialState.currentSource;
            state.videoLink = initialState.videoLink;
        }
    }
});
const { setTotalEpisodes , setCurrentSource , setSources , resetSources  } = gogoApiSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gogoApiSlice.reducer);


/***/ }),

/***/ 5092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TH": () => (/* binding */ toggleProxy),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ni": () => (/* binding */ toggleDub),
/* harmony export */   "pL": () => (/* binding */ setProxy)
/* harmony export */ });
/* unused harmony exports videoSettingsSlice, setDub */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-param-reassign */ 
const initialState = {
    useDub: false,
    useProxy: false
};
const videoSettingsSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "videoSettings",
    initialState,
    reducers: {
        toggleProxy: (state)=>{
            state.useProxy = !state.useProxy;
        },
        toggleDub: (state)=>{
            state.useDub = !state.useDub;
        },
        setProxy: (state, action)=>{
            state.useProxy = action.payload;
        },
        setDub: (state, action)=>{
            state.useDub = action.payload;
        }
    }
});
const { setDub , setProxy , toggleDub , toggleProxy  } = videoSettingsSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (videoSettingsSlice.reducer);


/***/ }),

/***/ 5162:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "lE": () => (/* binding */ initialiseStore),
  "I0": () => (/* binding */ useDispatch),
  "v9": () => (/* binding */ useSelector),
  "oR": () => (/* binding */ useStore)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/slices/anime.ts
var anime = __webpack_require__(2744);
// EXTERNAL MODULE: ./src/store/slices/episode.ts
var episode = __webpack_require__(961);
// EXTERNAL MODULE: ./src/store/slices/gogoApi.ts
var gogoApi = __webpack_require__(705);
;// CONCATENATED MODULE: ./src/store/slices/timer.ts
/* eslint-disable no-param-reassign */ 
const initialState = {
    startTime: 0,
    currentTime: 0
};
const timerSlice = (0,toolkit_.createSlice)({
    name: "timer",
    initialState,
    reducers: {
        setStartTime: (state, action)=>{
            state.startTime = action.payload;
        },
        setCurrentTime: (state, action)=>{
            if (state.currentTime === Math.ceil(action.payload)) return;
            state.currentTime = Math.ceil(action.payload);
        }
    }
});
const { setStartTime , setCurrentTime  } = timerSlice.actions;
/* harmony default export */ const timer = (timerSlice.reducer);

// EXTERNAL MODULE: ./src/store/slices/videoSettings.ts
var videoSettings = __webpack_require__(5092);
;// CONCATENATED MODULE: ./src/store/store.ts








const createStore = (preloadedState)=>(0,toolkit_.configureStore)({
        reducer: {
            anime: anime/* default */.ZP,
            episode: episode/* default */.ZP,
            videoSettings: videoSettings/* default */.ZP,
            timer: timer,
            gogoApi: gogoApi/* default */.ZP
        },
        preloadedState
    })
;
let prevStore;
const initialiseStore = (preloadedState)=>{
    let newStore = prevStore ?? createStore(preloadedState);
    if (preloadedState && prevStore) {
        newStore = createStore({
            ...prevStore.getState(),
            ...preloadedState
        });
        prevStore = undefined;
    }
    // For SSG and SSR always create a new store
    if (true) return newStore;
    // Create the store once in the client
    if (!prevStore) prevStore = newStore;
    return newStore;
};
const useStore = (preloadedState)=>(0,external_react_.useMemo)(()=>initialiseStore(preloadedState)
    , [
        preloadedState
    ])
;
// wrappers around the redux useDispatch and useSelectors for better types
const useDispatch = ()=>(0,external_react_redux_.useDispatch)()
;
const useSelector = (selector)=>(0,external_react_redux_.useSelector)(selector)
;


/***/ })

};
;