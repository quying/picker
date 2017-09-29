'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _jsxFileName = 'src/MultiPicker.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiPicker = function (_Component) {
	_inherits(MultiPicker, _Component);

	function MultiPicker(props) {
		_classCallCheck(this, MultiPicker);

		var _this = _possibleConstructorReturn(this, (MultiPicker.__proto__ || Object.getPrototypeOf(MultiPicker)).call(this, props));

		_this.state = {
			selectedValue: _this.getValue()
		};
		return _this;
	}

	_createClass(MultiPicker, [{
		key: 'getValue',
		value: function getValue() {
			var _props = this.props,
			    children = _props.children,
			    selectedValue = _props.selectedValue;

			if (selectedValue && selectedValue.length) {
				return selectedValue;
			} else {
				if (!children) {
					return [];
				}
				return _react2.default.Children.map(children, function (picker) {
					var pickerItems = _react2.default.Children.toArray(picker.props.children);

					return pickerItems && pickerItems[0] && pickerItems[0].props.value;
				});
			}
		}
	}, {
		key: 'onValueChange',
		value: function onValueChange(i, v) {
			var value = this.getValue().concat();
			value[i] = v;
			this.props.onValueChange(value, i);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    className = _props2.className,
			    children = _props2.children,
			    disabled = _props2.disabled;

			var selectedValue = this.getValue();
			var cloneChild = _react2.default.Children.map(children, function (picker, i) {
				return _react2.default.cloneElement(picker, {
					disabled: disabled,
					selectedValue: selectedValue[i],
					onValueChange: function onValueChange() {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						return _this2.onValueChange.apply(_this2, [i].concat(args));
					} //value
				});
			});

			return _react2.default.createElement(
				'div',
				_defineProperty({ style: this.props.style,
					className: className, __source: {
						fileName: _jsxFileName,
						lineNumber: 58
					},
					__self: this
				}, '__self', this),
				cloneChild
			);
		}
	}]);

	return MultiPicker;
}(_react.Component);

MultiPicker.propTypes = {
	selectedValue: _propTypes2.default.array,
	disabled: _propTypes2.default.bool
};
MultiPicker.defaultProps = {
	selectedValue: [],
	disabled: false
};
exports.default = MultiPicker;
module.exports = exports['default'];