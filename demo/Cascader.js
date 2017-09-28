import React from 'react';

import { Popup, Cascader } from '../src/index';
import globalData from './data.js';

const COL = 3;

export default class UseCascader extends React.Component {
	constructor (props) {

		super (props);
		this.state = {
			value: this.getValue() 
		};
		
		this.onChange = this.onChange.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onDismess = this.onDismess.bind(this);
	}

	getValue() {
		let { data, value } = this.props

		if(!value || !value.length) {
			value = [];
			for (let i = 0; i < COL; i++) {
	        	if (data && data.length) {
	          		value[i] = data[0].value;
	         		data = data[0].children;

	        	}
	      	}
		}
		return value;
	}

	onChange (value) {
		if(value !== this.state.value) {
			this.setState({
				value
			});
		}
		console.log('onChange', value);	
	}

	onOk() {
		const value = this.state.value;

		if(this.props.onOk) {
			this.props.onOk(value, 'cas');
		}
	}

	onDismess() {
		this.props.onDismess('cas');
	}

	render () {
		const cascader = (
			<Cascader 
				cols={ COL }
				value={ this.state.value }
				className="lm-ui-multi-picker"
				data={ globalData } 
				onChange={ this.onChange } />
		);

		return (
			<div>
				<button className="lm-ui-button" onClick={ this.props.clickHandler }>级联</button>
				<span> 选择的值：{ this.props.selected } </span>

				<Popup
					title="选择"
					value={ this.state.value }
					picker={ cascader }
					showState={ this.props.showState }
					onDismess = { this.onDismess }
					onOk={ this.onOk }
				>
					
				</Popup>
			</div>
			
		)
	}
}
