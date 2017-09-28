import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModelHOC from 'lm-model';

class Popup extends Component {
	static propTypes = {
		showState: PropTypes.bool,
	    opacity: PropTypes.number,
	    onOk: PropTypes.func,
	    onDismess: PropTypes.func
	};

	static defaultProps = {
	    showState: false,
	    opacity: 5,
	    onOk: ()=>{},
	    onDismess: ()=>{}
	};

	constructor(props) {
		super(props);

		this.state = {
			value: 'value' in this.props ? this.props.value : null,
			showState: this.props.showState || false,
		}

		this.onOk = this.onOk.bind(this);
		this.onDismess = this.onDismess.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
			this.setState({
				value: nextProps.value,
			});
	    }
	    if ('showState' in nextProps) {
	    	this.setState({
	    		showState: nextProps.showState
	    	});
	    }
	}

	onOk() {
		this.props.onOk(this.picker && this.picker.getValue());
	}

	onDismess() {
		this.props.onDismess();
	}

	onPickerChange(value) {
		if(this.state.value !== value) {
			this.setState({
				value
			})
		}
		const { picker } = this.props;
		if(picker && picker.props.onValueChange) {
			picker.props.onValueChange(value);
		}

	}

	getContent() {
		if(this.props.picker) {
			return React.cloneElement(this.props.picker, ({
				selectedValue: this.state.value,
				onValueChange: this.onPickerChange,
				ref: (picker) => this.picker = picker
			}));
		} else {
			return this.props.content;
		}
	}

	render() {
		const { title } = this.props;
		return (
			<div className="lm-ui-popup">
				<div className="lm-ui-popup-header">
                    <div className="btn-cancel" onClick={ this.onDismess }>取消</div>
                    <div className="title">{ title }</div>
                    <div className="btn-cancel" onClick={ this.onOk }>确定</div>
                </div>

                { this.getContent() }
			</div>
		)
	}

}

export default ModelHOC(Popup);

