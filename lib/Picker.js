'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'src/Picker.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _zscroller = require('zscroller');

var _zscroller2 = _interopRequireDefault(_zscroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picker = function (_Component) {
    _inherits(Picker, _Component);

    function Picker(props) {
        _classCallCheck(this, Picker);

        var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

        _this.state = {
            selectedValue: _this.getSelectedValue()
        };

        _this.scrollingComplete = _this.scrollingComplete.bind(_this);

        return _this;
    }

    //默认选中值


    _createClass(Picker, [{
        key: 'getSelectedValue',
        value: function getSelectedValue() {
            var selectedValue = this.props.selectedValue;


            if (selectedValue !== undefined) {
                return selectedValue;
            } else {
                var children = _react2.default.Children.toArray(this.props.children);
                return children && children[0] && children[0].props.value;
            }
        }
        //计算高度，初始化scroller

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _refs = this.refs,
                content = _refs.content,
                indicator = _refs.indicator,
                mask = _refs.mask,
                root = _refs.root;

            var rootHeight = root.getBoundingClientRect().height;
            var itemHeight = this.itemHeight = indicator.getBoundingClientRect().height;

            var num = Math.floor(rootHeight / itemHeight);
            if (num % 2 === 0) {
                num--;
            }
            num--;
            num /= 2;

            content.style.padding = itemHeight * num + 'px 0';
            indicator.style.top = itemHeight * num + 'px';
            mask.style.backgroundSize = '100% ' + itemHeight * num + 'px';

            this.zscroller = new _zscroller2.default(content, {
                scrollingX: false,
                snapping: true,
                /** Enable locking to the main axis if user moves only slightly on one of them at start */
                locking: false,
                /** This configures the amount of change applied to deceleration when reaching boundaries  **/
                penetrationDeceleration: .1,
                // How much velocity is required to keep the deceleration running
                minVelocityToKeepDecelerating: 0.5,
                /** Callback that is fired on the later of touch end or deceleration end,
                    provided that another scrolling action has not begun. Used to know
                    when to fade out a scrollbar. */
                scrollingComplete: this.scrollingComplete
            });
            this.zscroller.setDisabled(this.props.disabled);
            // Setup snap dimensions (only needed when snapping is enabled)
            this.zscroller.scroller.setSnapSize(0, itemHeight);
            this.select(this.state.selectedValue);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('selectedValue' in nextProps) {
                this.setState({
                    selectedValue: nextProps.selectedValue
                });
            }
            this.zscroller.setDisabled(nextProps.disabled);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.state.selectedValue !== nextState.selectedValue || this.props.children !== nextProps.children;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.zscroller.reflow();
            this.select(this.state.selectedValue);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.zscroller.destroy();
        }
    }, {
        key: 'select',
        value: function select(value) {
            var children = _react2.default.Children.toArray(this.props.children);

            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i].props.value === value) {
                    this.selectByIndex(i);
                    return;
                }
            }
            this.selectByIndex(0);
        }
    }, {
        key: 'selectByIndex',
        value: function selectByIndex(index) {
            if (index < 0 || index >= _react2.default.Children.count(this.props.children) || !this.itemHeight) {
                return;
            }
            this.scrollTo(index * this.itemHeight);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo(top) {
            this.zscroller.scroller.scrollTo(0, top);
        }
        //zscroller scrollingComplete

    }, {
        key: 'scrollingComplete',
        value: function scrollingComplete() {
            var _zscroller$scroller$g = this.zscroller.scroller.getValues(),
                top = _zscroller$scroller$g.top;

            if (top >= 0) {
                this.doScrollingComplete(top);
            }
        }

        //计算应该选中的index

    }, {
        key: 'doScrollingComplete',
        value: function doScrollingComplete(top) {
            var index = top / this.itemHeight;
            var floor = Math.floor(index);
            if (index - floor > 0.5) {
                index = floor + 1;
            } else {
                index = floor;
            }
            var children = _react2.default.Children.toArray(this.props.children);
            index = Math.min(index, children.length - 1);
            //当前选中项
            var child = children[index];
            if (child) {
                this.fireValueChange(child.props.value);
            } else if (console.warn) {
                console.warn('child not found', children, index);
            }
        }
    }, {
        key: 'fireValueChange',
        value: function fireValueChange(selectedValue) {
            if (selectedValue !== this.state.selectedValue) {
                if (!('selectedValue' in this.props)) {
                    this.setState({
                        selectedValue: selectedValue
                    });
                }
                if (this.props.onValueChange) {
                    this.props.onValueChange(selectedValue);
                }
            }
        }

        //提供给其他组件调用的方法

    }, {
        key: 'getValue',
        value: function getValue() {
            if ('selectedValue' in this.props) {
                return this.props.selectedValue;
            }
            var children = _react2.default.Children.toArray(this.props.children);
            return children && children[0] && children[0].props.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                selectedValue = _props.selectedValue,
                selectedClassName = _props.selectedClassName,
                children = _props.children;


            var itemClassName = 'lm-ui-picker-item';
            var selectedItemClassName = itemClassName + ' lm-ui-picker-item-selected';

            var map = function map(item) {
                var _item$props = item.props,
                    _item$props$className = _item$props.className,
                    className = _item$props$className === undefined ? '' : _item$props$className,
                    style = _item$props.style,
                    value = _item$props.value;

                return _react2.default.createElement(
                    'div',
                    _defineProperty({
                        style: Object.assign({}, style),
                        className: (selectedValue === value ? selectedItemClassName : itemClassName) + ' ' + className,
                        key: value,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 188
                        },
                        __self: _this2
                    }, '__self', _this2),
                    item.children || item.props.children
                );
            };

            var items = _react2.default.Children.map(children, map);

            return _react2.default.createElement(
                'div',
                _defineProperty({ className: 'lm-ui-picker', ref: 'root', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 202
                    },
                    __self: this
                }, '__self', this),
                _react2.default.createElement('div', _defineProperty({ className: 'lm-ui-picker-mask', ref: 'mask', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 204
                    },
                    __self: this
                }, '__self', this)),
                _react2.default.createElement('div', _defineProperty({ className: 'lm-ui-picker-indicator ' + selectedClassName, ref: 'indicator', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 205
                    },
                    __self: this
                }, '__self', this)),
                _react2.default.createElement(
                    'div',
                    _defineProperty({ className: 'lm-ui-picker-content', ref: 'content', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 206
                        },
                        __self: this
                    }, '__self', this),
                    items
                )
            );
        }
    }]);

    return Picker;
}(_react.Component);

Picker.propTypes = {
    selectedValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    disabled: _propTypes2.default.bool
};
Picker.defaultProps = {
    selectedValue: 0,
    disabled: false
};
exports.default = Picker;
module.exports = exports['default'];