"use strict";
exports.id = 998;
exports.ids = [998];
exports.modules = {

/***/ 3998:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2426);




const Card = ({ anime  })=>{
    const title = anime.title.romaji || anime.title.english;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: `/anime/${anime.id}`,
        passHref: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: "w-46 transform p-2 transition duration-300 ease-out hover:scale-105 sm:w-56",
            style: {
                margin: "0"
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "aspect-w-7 aspect-h-9 relative w-40 sm:w-52",
                style: {
                    position: "relative",
                    textShadow: "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
                    height: "60vh"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                        alt: "Cover Image",
                        src: anime.coverImage.large || anime.coverImage.medium,
                        layout: "fill",
                        objectFit: "cover",
                        objectPosition: "center",
                        className: "rounded-md",
                        placeholder: "blur",
                        style: {
                            borderRadius: "0"
                        },
                        blurDataURL: `data:image/svg+xml;base64,${(0,_utility_image__WEBPACK_IMPORTED_MODULE_3__/* .base64SolidImage */ .YE)(anime.coverImage.color)}`
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "cardTitle",
                        style: {
                            position: "absolute",
                            fontSize: "1.2vw",
                            display: "flex"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mt-2 h-9 text-sm font-bold text-white line-clamp-2",
                            style: {
                                alignSelf: "flex-end",
                                marginLeft: "2%",
                                marginBottom: "1%"
                            },
                            children: title
                        })
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ })

};
;