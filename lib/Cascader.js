'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _jsxFileName = 'src/Cascader.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _arrayTreeFilter = require('array-tree-filter');

var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _MultiPicker = require('./MultiPicker');

var _MultiPicker2 = _interopRequireDefault(_MultiPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cascader = function (_Component) {
	_inherits(Cascader, _Component);

	function Cascader(props) {
		_classCallCheck(this, Cascader);

		var _this = _possibleConstructorReturn(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).call(this, props));

		_this.state = {
			value: _this.getValue(_this.props.data, _this.props.value)
		};

		_this.onValueChange = _this.onValueChange.bind(_this);
		return _this;
	}

	_createClass(Cascader, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: this.getValue(nextProps.data, nextProps.value)
				});
			}
		}
	}, {
		key: 'getValue',
		value: function getValue(d, val) {
			var data = d || this.props.data;
			var value = val || this.props.value;
			//无指定value时默认选中第一项
			if (!value || !value.length) {
				value = [];
				for (var i = 0; i < this.props.cols; i++) {
					if (data && data.length) {
						value[i] = data[0].value;
						data = data[0].children;
					}
				}
			}
			return value;
		}
	}, {
		key: 'onValueChange',
		value: function onValueChange(value, index) {
			var children = (0, _arrayTreeFilter2.default)(this.props.data, function (item, level) {
				return level <= index && item.value === value[level];
			});
			var data = children[index];
			var i = void 0;
			for (i = index + 1; data && data.children && data.children.length && i < this.props.cols; i++) {
				data = data.children[0];
				value[i] = data.value;
			}
			value.length = i;

			if (!('value' in this.props)) {
				this.setState({
					value: value
				});
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'getCols',
		value: function getCols() {
			var _this2 = this;

			var _props = this.props,
			    data = _props.data,
			    cols = _props.cols;

			var value = this.state.value;
			//根据value获取的节点数组
			var childrenTree = (0, _arrayTreeFilter2.default)(data, function (item, level) {
				return item.value === value[level];
			}).map(function (item) {
				return item.children;
			});

			childrenTree.length = cols - 1;
			childrenTree.unshift(data);
			// console.log(childrenTree)
			return childrenTree.map(function () {
				var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				var level = arguments[1];
				return _react2.default.createElement(
					_Picker2.default,
					_defineProperty({ key: level, style: { flex: 1 }, __source: {
							fileName: _jsxFileName,
							lineNumber: 89
						},
						__self: _this2
					}, '__self', _this2),
					children.map(function (item) {
						return _react2.default.createElement(
							'div',
							_defineProperty({ value: item.value, key: item.value, __source: {
									fileName: _jsxFileName,
									lineNumber: 91
								},
								__self: _this2
							}, '__self', _this2),
							item.label
						);
					})
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    style = _props2.style,
			    disabled = _props2.disabled;

			var cols = this.getCols();
			var multiStyle = Object.assign({
				flexDirection: 'row',
				alignItems: 'center'
			}, style);
			return _react2.default.createElement(
				_MultiPicker2.default,
				_defineProperty({
					disabled: disabled,
					style: multiStyle,
					className: className,
					selectedValue: this.state.value,
					onValueChange: this.onValueChange, __source: {
						fileName: _jsxFileName,
						lineNumber: 106
					},
					__self: this
				}, '__self', this),
				cols
			);
		}
	}]);

	return Cascader;
}(_react.Component);

Cascader.propTypes = {
	cols: _propTypes2.default.number,
	data: _propTypes2.default.array,
	disabled: _propTypes2.default.bool
};
Cascader.defaultProps = {
	cols: 3,
	data: [],
	disabled: false
};
exports.default = Cascader;
module.exports = exports['default'];