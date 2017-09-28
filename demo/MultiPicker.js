import React from 'react';

import { Picker, MultiPicker, Popup } from '../src/index';


export default class UseMultiPicker extends React.Component {


	constructor (props) {

		super (props);
		this.state = {
		    value: this.getValue()
		}

		this.onChange = this.onChange.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onDismess = this.onDismess.bind(this);
	}

	getValue() {
		const { value, data } = this.props;
	    if(value && value.length) {
	    	return value;
	    } else {
	    	return data.map((child) => {
	    		return child[0].value;
	    	})
	    }
	}

	onChange (value) {
		console.log('onChange', value);
		if(value !== this.state.value) {
			this.setState({
				value
			});	
		}
		
	}

	onOk() {
		const value = this.state.value;

		if(this.props.onOk) {
			this.props.onOk(value, 'multi');
		}
	}

	onDismess() {
		this.props.onDismess('multi');
	}

	render () {
		const { data } = this.props;

		const children = data.map((child, index) => (
			<Picker key={ index }>
			{ child.map((item) => 
				<div value={ item.value } key={ item.value }>{ item.label }</div>)
			}
			</Picker>
		));
		const multi = (
			<MultiPicker
	        	className="lm-ui-multi-picker"
				selectedValue={this.state.value}
				onValueChange={this.onChange}
	        >
	        	{ children }
	        </MultiPicker>
		)
		return (
			<div>
				<button className="lm-ui-button" onClick={ this.props.clickHandler }>多选</button>
				<span> 选择的值：{ this.props.selected } </span>

		        <Popup
					title="选择"
					value={ this.state.value }
					picker={ multi }
					showState={ this.props.showState }
					onDismess = { this.onDismess }
					onOk={ this.onOk }
				>
					
				</Popup>
		    </div>
			
		)

	}

}
