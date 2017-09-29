import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import ZScroller from 'zscroller';


export default class Picker extends Component {
    static propTypes = {
        selectedValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        disabled: PropTypes.bool
    };

    static defaultProps = {
        selectedValue: 0,
        disabled: false
    };

	constructor(props) {

        super(props);

        this.state = {
            selectedValue: this.getSelectedValue()
        };

        this.scrollingComplete = this.scrollingComplete.bind(this)

    }
    
    //默认选中值
    getSelectedValue() {
        const { selectedValue } = this.props;
        
        if (selectedValue !== undefined) {
            return selectedValue;
        } else {
            const children = React.Children.toArray(this.props.children);
            return children && children[0] && children[0].props.value;
        }
    
    }
    //计算高度，初始化scroller
    componentDidMount () {
        const { content, indicator, mask, root } = this.refs;
        const rootHeight = root.getBoundingClientRect().height;
        const itemHeight = this.itemHeight = indicator.getBoundingClientRect().height;

        let num = Math.floor(rootHeight / itemHeight);
        if(num % 2 === 0) {
            num--;
        }
        num--;
        num /= 2;

        content.style.padding = `${itemHeight * num}px 0`;
        indicator.style.top = `${itemHeight * num}px`;
        mask.style.backgroundSize = `100% ${itemHeight * num}px`;

        this.zscroller = new ZScroller(content, {
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
            scrollingComplete: this.scrollingComplete,
        });
        this.zscroller.setDisabled(this.props.disabled);
        // Setup snap dimensions (only needed when snapping is enabled)
        this.zscroller.scroller.setSnapSize(0, itemHeight);
        this.select(this.state.selectedValue);
    }

    componentWillReceiveProps (nextProps) {
        if ('selectedValue' in nextProps) {
            this.setState({
                selectedValue: nextProps.selectedValue,
            });
        }
        this.zscroller.setDisabled(nextProps.disabled);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selectedValue !== nextState.selectedValue
          || this.props.children !== nextProps.children;
    }

    componentDidUpdate() {
        this.zscroller.reflow();
        this.select(this.state.selectedValue);  
    }

    componentWillUnmount() {
        this.zscroller.destroy();
    }

    select(value) {
        const children = React.Children.toArray(this.props.children);

        for (let i = 0, len = children.length; i < len; i++) {
            if (children[i].props.value === value) {
                this.selectByIndex(i);
                return;
            }
        }
        this.selectByIndex(0);
    }

    selectByIndex(index) {
        if (index < 0 || index >= React.Children.count(this.props.children) || !this.itemHeight) {
          return;
        }
        this.scrollTo(index * this.itemHeight);
    }

    scrollTo(top) {
        this.zscroller.scroller.scrollTo(0, top);
    }
    //zscroller scrollingComplete
    scrollingComplete() {
        const { top } = this.zscroller.scroller.getValues();

        if (top >= 0) {
          this.doScrollingComplete(top);  
        }
    }

    //计算应该选中的index
    doScrollingComplete(top) {
        let index = top / this.itemHeight;
        const floor = Math.floor(index);
        if (index - floor > 0.5) {
            index = floor + 1;
        } else {
            index = floor;
        }
        const children = React.Children.toArray(this.props.children);
        index = Math.min(index, children.length - 1);
        //当前选中项
        const child = children[index];
        if (child) {
            this.fireValueChange(child.props.value);
        } else if (console.warn) {
            console.warn('child not found', children, index);
        }
    }

    fireValueChange(selectedValue) {
        if (selectedValue !== this.state.selectedValue) {
            if (!('selectedValue' in this.props)) {
                this.setState({
                  selectedValue,
                });
            }
            if (this.props.onValueChange) {
                this.props.onValueChange(selectedValue);
            }
        }
    }

    //提供给其他组件调用的方法
    getValue() {
        if ('selectedValue' in this.props) {
          return this.props.selectedValue;
        }
        const children = React.Children.toArray(this.props.children);
        return children && children[0] && children[0].props.value;
    }

	render () {
        const { selectedValue, selectedClassName, children} = this.props;

        const itemClassName = 'lm-ui-picker-item';
        const selectedItemClassName = `${itemClassName} lm-ui-picker-item-selected`;

        const map = (item) => {
            const { className = '', style, value } = item.props;
              return (
                <div
                  style={{ ...style }}
                  className={`${selectedValue === value ? selectedItemClassName : itemClassName} ${className}`}
                  key={value}
                >
                  {item.children || item.props.children}
                </div>
              );
        };
        
        const items = React.Children.map(children, map);

		return (

			<div className="lm-ui-picker" ref="root">
               
                <div className="lm-ui-picker-mask" ref="mask"/>
                <div className={`lm-ui-picker-indicator ${selectedClassName}`} ref="indicator" />
                <div className="lm-ui-picker-content" ref="content">
                    {items}
                </div>
                
            </div>

		)

	}

}

