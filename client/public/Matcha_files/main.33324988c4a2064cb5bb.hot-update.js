webpackHotUpdate("main",{

/***/ "./src/components/flash/Flash-view.jsx":
/*!*********************************************!*\
  !*** ./src/components/flash/Flash-view.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Flash_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Flash.css */ "./src/components/flash/Flash.css");
/* harmony import */ var _Flash_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Flash_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/hben-yah/Desktop/Projets/Matcha/client/src/components/flash/Flash-view.jsx";



function Flash(props) {
  let type;
  let message;

  if (props.errors && props.errors.length > 0) {
    type = "danger";
    message = props.errors;
  } else if (props.notices && props.notices.length > 0) {
    type = "success";
    message = props.notices;
  } else return null;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Flash alert my-3 alert-" + type,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, message.map((value, key) => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: key,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, value);
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (Flash);

/***/ })

})
//# sourceMappingURL=main.33324988c4a2064cb5bb.hot-update.js.map