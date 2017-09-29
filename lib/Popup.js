'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _jsxFileName = 'src/Popup.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lmModel = require('lm-model');

var _lmModel2 = _interopRequireDefault(_lmModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_Component) {
	_inherits(Popup, _Component);

	function Popup(props) {
		_classCallCheck(this, Popup);

		var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

		_this.state = {
			value: 'value' in _this.props ? _this.props.value : null,
			showState: _this.props.showState || false
		};

		_this.onOk = _this.onOk.bind(_this);
		_this.onDismess = _this.onDismess.bind(_this);
		_this.onPickerChange = _this.onPickerChange.bind(_this);
		return _this;
	}

	_createClass(Popup, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value
				});
			}
			if ('showState' in nextProps) {
				this.setState({
					showState: nextProps.showState
				});
			}
		}
	}, {
		key: 'onOk',
		value: function onOk() {
			this.props.onOk(this.picker && this.picker.getValue());
		}
	}, {
		key: 'onDismess',
		value: function onDismess() {
			this.props.onDismess();
		}
	}, {
		key: 'onPickerChange',
		value: function onPickerChange(value) {
			if (this.state.value !== value) {
				this.setState({
					value: value
				});
			}
			var picker = this.props.picker;

			if (picker && picker.props.onValueChange) {
				picker.props.onValueChange(value);
			}
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			var _this2 = this;

			if (this.props.picker) {
				return _react2.default.cloneElement(this.props.picker, {
					selectedValue: this.state.value,
					onValueChange: this.onPickerChange,
					ref: function ref(picker) {
						return _this2.picker = picker;
					}
				});
			} else {
				return this.props.content;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var title = this.props.title;

			return _react2.default.createElement(
				'div',
				_defineProperty({ className: 'lm-ui-popup', __source: {
						fileName: _jsxFileName,
						lineNumber: 83
					},
					__self: this
				}, '__self', this),
				_react2.default.createElement(
					'div',
					_defineProperty({ className: 'lm-ui-popup-header', __source: {
							fileName: _jsxFileName,
							lineNumber: 84
						},
						__self: this
					}, '__self', this),
					_react2.default.createElement(
						'div',
						_defineProperty({ className: 'btn-cancel', onClick: this.onDismess, __source: {
								fileName: _jsxFileName,
								lineNumber: 85
							},
							__self: this
						}, '__self', this),
						'\u53D6\u6D88'
					),
					_react2.default.createElement(
						'div',
						_defineProperty({ className: 'title', __source: {
								fileName: _jsxFileName,
								lineNumber: 86
							},
							__self: this
						}, '__self', this),
						title
					),
					_react2.default.createElement(
						'div',
						_defineProperty({ className: 'btn-cancel', onClick: this.onOk, __source: {
								fileName: _jsxFileName,
								lineNumber: 87
							},
							__self: this
						}, '__self', this),
						'\u786E\u5B9A'
					)
				),
				this.getContent()
			);
		}
	}]);

	return Popup;
}(_react.Component);

Popup.propTypes = {
	showState: _propTypes2.default.bool,
	opacity: _propTypes2.default.number,
	onOk: _propTypes2.default.func,
	onDismess: _propTypes2.default.func
};
Popup.defaultProps = {
	showState: false,
	opacity: 5,
	onOk: function onOk() {},
	onDismess: function onDismess() {}
};
exports.default = (0, _lmModel2.default)(Popup);
module.exports = exports['default'];