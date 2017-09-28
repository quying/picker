import React from 'react';

import { Picker, Popup } from '../src/index';


export default class UsePicker extends React.Component {
	constructor (props) {

		super (props);
		this.state = {
		    value: this.props.value,
		    disabled: false
		}

		this.onChange = this.onChange.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onDismess = this.onDismess.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState({
			disabled: !this.state.disabled
		})
	}

	getItems() {
		const items = [];
		for (let i = 0; i < 10; i++) {
		  items.push(<div value={i + ''} key={i}>
		    {i}
		  </div>);
		}
		return items;
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
			this.props.onOk(value, 'picker');
		}
	}

	onDismess() {
		this.props.onDismess('picker');
	}

	render () {
		const items = this.getItems();
		const picker = (
			<Picker
				selectedValue={ this.state.value }
				disabled={ this.state.disabled }
				onValueChange={ this.onChange }>
	        	{ items }
	    	</Picker>
	    );
		
		return (
			<div>
				<button className="lm-ui-button" onClick={ this.props.clickHandler }>单选</button>
				<span> 选择的值：{ this.props.value } </span>

				<Popup
					title="选择"
					value={ this.state.value }
					picker={ picker }
					showState={ this.props.showState }
					onDismess = { this.onDismess }
					onOk={ this.onOk }
				/>

				<button className="lm-ui-disable-button" onClick={ this.clickHandler }>
					{ this.state.disabled ? "disable" : "enable" }
				</button>
		    </div>
			
		)

	}
}