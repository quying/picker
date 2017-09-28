import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MultiPicker extends Component {
	static propTypes = {
		selectedValue: PropTypes.array,
		disabled: PropTypes.bool
	};

	static defaultProps = {
	    selectedValue: [],
	    disabled: false
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedValue: this.getValue(),
		};
	}

	getValue() {
	    const { children, selectedValue } = this.props;
	    if(selectedValue && selectedValue.length) {
	    	return selectedValue;
	    } else {
	    	if(!children) {
	    		return [];
	    	}
	    	return React.Children.map(children, (picker) => {
	    		const pickerItems = React.Children.toArray(picker.props.children);

	    		return pickerItems && pickerItems[0] && pickerItems[0].props.value;
	    	})
	    }
	    
	}

	onValueChange(i, v) {
		const value = this.getValue().concat();
		value[i] = v;
		this.props.onValueChange(value, i);
	}

	render() {
		const { className, children, disabled } = this.props;
		const selectedValue = this.getValue();
		const cloneChild = React.Children.map(children, (picker, i) => {
			return React.cloneElement(picker, {
				disabled,
				selectedValue: selectedValue[i],
				onValueChange: (...args) => this.onValueChange(i, ...args)//value
			});
		});

		return (
			<div style={this.props.style} 
				className={ className } >
				{ cloneChild }
			</div>
		);
	}

}