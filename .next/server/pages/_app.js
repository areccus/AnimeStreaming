"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5191);
/* harmony import */ var _badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0__);

const progressBar = new (_badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0___default())({
    size: 4,
    color: "#C3073F",
    className: "z-50",
    delay: 100
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (progressBar);


/***/ }),

/***/ 6505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6641);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6937);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5162);







// start progress bar when the route starts to change
next_router__WEBPACK_IMPORTED_MODULE_1___default().events.on("routeChangeStart", _components_Progress__WEBPACK_IMPORTED_MODULE_4__/* ["default"].start */ .Z.start);
// finish the progress bar if there is an error while route change
next_router__WEBPACK_IMPORTED_MODULE_1___default().events.on("routeChangeError", _components_Progress__WEBPACK_IMPORTED_MODULE_4__/* ["default"].finish */ .Z.finish);
function MyApp({ Component , pageProps  }) {
    const reduxStore = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__/* .useStore */ .oR)(pageProps.initialReduxState);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_seo__WEBPACK_IMPORTED_MODULE_2__.DefaultSeo, {
                title: "Animeflix - Watch animes without ads",
                description: "Watch anime shows, tv, movies for free without ads on your mobile, tablet, or pc",
                additionalMetaTags: [
                    {
                        name: "keywords",
                        content: "watch animes, animes online, anime adsfree, adfree anime"
                    },
                    {
                        name: "theme-color",
                        content: "#0F0F0F"
                    },
                    {
                        name: "applie-mobile-web-app-capable",
                        content: "yes"
                    },
                    {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "#0F0F0F"
                    }, 
                ],
                twitter: {
                    cardType: "summary_large_image"
                },
                openGraph: {
                    site_name: "Animeflix",
                    images: [
                        {
                            url: "/preview.png",
                            alt: "Site preview image",
                            type: "large"
                        }, 
                    ]
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {
                store: reduxStore,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);


/***/ }),

/***/ 5191:
/***/ ((module) => {

module.exports = require("@badrap/bar-of-progress");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 6641:
/***/ ((module) => {

module.exports = require("next-seo");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [162], () => (__webpack_exec__(6505)));
module.exports = __webpack_exports__;

})();