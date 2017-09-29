import React, { Component } from 'react'
import PropTypes from 'prop-types'
import arrayTreeFilter from 'array-tree-filter';
import Picker from './Picker';
import MultiPicker from './MultiPicker';

export default class Cascader extends Component {

	static propTypes = {
	    cols: PropTypes.number,
	    data: PropTypes.array,
	    disabled: PropTypes.bool
	};

	static defaultProps = {
		cols: 3,
	    data: [],
	    disabled: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			value: this.getValue(this.props.data, this.props.value),
		}

		this.onValueChange = this.onValueChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if('value' in nextProps) {
			this.setState({
				value: this.getValue(nextProps.data, nextProps.value)
			});
		}
	}

	getValue(d, val) {
		let data = d || this.props.data;
		let value = val || this.props.value;
		//无指定value时默认选中第一项
		if (!value || !value.length) {
	      	value = [];
	      	for (let i = 0; i < this.props.cols; i++) {
	        	if (data && data.length) {
	          		value[i] = data[0].value;
	         		data = data[0].children;

	        	}
	      	}
	    }
		return value;
	}

	onValueChange(value, index) {
		const children = arrayTreeFilter(this.props.data, (item, level) => {
			return level <= index && item.value === value[level];
		});
		let data = children[index];
		let i;
		for(i = index + 1; data && data.children && data.children.length && i < this.props.cols; i++) {
			data = data.children[0];
			value[i] = data.value;
		}
		value.length = i;

		if(!('value' in this.props)) {
			this.setState({
				value
			})
		}
		if(this.props.onChange) {
			this.props.onChange(value);
		}
	}

	getCols() {
		const { data, cols } = this.props;
		const value = this.state.value;
		//根据value获取的节点数组
		const childrenTree = arrayTreeFilter(data, (item, level)=>{
			return item.value === value[level];
		}).map(item => item.children);
	     
	    childrenTree.length = cols - 1;
	    childrenTree.unshift(data);
	    // console.log(childrenTree)
	    return childrenTree.map((children=[], level) => (
			<Picker key={ level } style={{ flex: 1 }}>
			{children.map(item =>
			  <div value={ item.value } key={ item.value }>{ item.label }</div>)
			}
			</Picker>
		));
	}

	render() {
		const { className, style, disabled } = this.props;
		const cols = this.getCols();
		const multiStyle = {
			flexDirection: 'row',
			alignItems: 'center',
			...style
		};
		return (
			<MultiPicker 
				disabled={ disabled }
				style={ multiStyle }
		        className={ className }
		        selectedValue={ this.state.value }
		        onValueChange={ this.onValueChange } >
		        { cols }
		    </MultiPicker>
		)
	}
}


