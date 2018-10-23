"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withLoader;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withLoader(Loader) {
  return function wrap(WrappedComponent) {
    var PageWithLoader =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(PageWithLoader, _React$Component);

      function PageWithLoader() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, PageWithLoader);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageWithLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
          readyClientSide: false
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ready", function () {
          var readyServerSide = _this.state.readyServerSide;
          var readyClientSide = _this.props.readyClientSide;
          return readyServerSide || readyClientSide;
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadData", function () {
          if (!_this.ready()) {
            var context = _this.props.context;
            WrappedComponent.getInitialProps(context).then(function (initialProps) {
              _this.setState(_objectSpread({}, initialProps, {
                readyClientSide: true
              })); // recupero le props e le pusho nello state

            });
          }
        });

        return _this;
      }

      _createClass(PageWithLoader, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (!this.ready()) {
            console.debug('PageWithLoader componentDidMount');
            this.loadData();
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          if (!this.ready()) {
            console.debug('PageWithLoader componentDidUpdate');
            this.loadData();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              readyServerSide = _this$props.readyServerSide,
              context = _this$props.context,
              childProps = _objectWithoutProperties(_this$props, ["readyServerSide", "context"]);

          var _this$state = this.state,
              readyClientSide = _this$state.readyClientSide,
              childState = _objectWithoutProperties(_this$state, ["readyClientSide"]);

          if (!this.ready() && Loader) {
            return _react.default.createElement(Loader, null);
          }

          return _react.default.createElement(WrappedComponent, _extends({}, childProps, childState));
        }
      }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props, state) {
          if (props.asPath && state.asPath && props.asPath !== state.asPath) {
            return {
              readyClientSide: false
            };
          }

          return null;
        }
      }]);

      return PageWithLoader;
    }(_react.default.Component);

    (0, _hoistNonReactStatics.default)(PageWithLoader, WrappedComponent);
    PageWithLoader.displayName = "PageWithLoader(".concat((0, _utils.getDisplayName)(WrappedComponent), ")");
    PageWithLoader.defaultProps = {
      readyServerSide: false
    };
    PageWithLoader.propTypes = {
      readyServerSide: _propTypes.default.bool,
      context: _propTypes.default.shape({
        req: _propTypes.default.object,
        asPath: _propTypes.default.string.isRequired,
        pathname: _propTypes.default.string.isRequired,
        query: _propTypes.default.object.isRequired,
        res: _propTypes.default.object,
        jsonPageRes: _propTypes.default.object,
        err: _propTypes.default.object
      }).isRequired
    };

    PageWithLoader.getInitialProps =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(context) {
        var req, res, initialContext;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = context.req, res = context.res, initialContext = _objectWithoutProperties(context, ["req", "res"]);

                if (!req) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", WrappedComponent.getInitialProps(context).then(function (pageProps) {
                  return _objectSpread({}, pageProps, {
                    readyServerSide: true,
                    context: initialContext
                  });
                }));

              case 3:
                return _context.abrupt("return", {
                  readyServerSide: false,
                  context: initialContext
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    return PageWithLoader;
  };
}