import React, { Component } from 'react'

import './index.scss'
import UsePicker from './Picker';
import UseMultiPicker from './MultiPicker';
import UseCascader from './Cascader';

import arrayTreeFilter from 'array-tree-filter';

import globalData from './data.js';


let count = 0;
const len = 10;


const data = [
    [
        {
          label: '2013',
          value: '100',
        },
        {
          label: '2014',
          value: '200',
        }
    ],
    [
        {
          label: '春',
          value: '101',
        },
        {
          label: '夏',
          value: '102',
        }
    ],
];
export default class App extends Component {

    constructor (props) {

        super (props);
        this.state = {
            disabled: false,
            pickerValue: `${count + len / 2}`,
            multiValue: [],
            casValue: ["02", "02-1", "02-1-1"],
            text: '',
            pickerShowState: false,
            multiShowState: false,
            casShowState: false
        }
        this.onChange = this.onChange.bind(this);
        this.pickerClickHandler = this.pickerClickHandler.bind(this);
        this.multiClickHandler = this.multiClickHandler.bind(this);
        this.casClickHandler = this.casClickHandler.bind(this);
    
        this.onOk = this.onOk.bind(this);
        this.onDismess = this.onDismess.bind(this);
    }

    onChange (value) {
        console.log('onChange', value);
    }

    disable() {
        this.setState({
          disabled: !this.state.disabled,
        });
    }

    getSel() {
        const value = this.state.multiValue;
        if (!value) {
          return '';
        }

        const label = [];   
        data.map((child, index) => {        
            child.map((item) => {
                if(item.value === value[index]) {
                    label.push(item.label);
                }
            })
        }); 

        return label.join(',');
    }

    getCasSel() {
        const value = this.state.casValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(globalData, (c, level) => {
          return c.value === value[level];
        });
        return treeChildren.map((v) => {
          return v.label;
        }).join(',');
    }

    pickerClickHandler() {
        this.setState({
            pickerShowState: !this.state.pickerShowState
        })
    }

    multiClickHandler() {
        this.setState({
            multiShowState: !this.state.multiShowState
        })
    }
    casClickHandler() {
        this.setState({
            casShowState: !this.state.casShowState
        })
    }

    onOk(value, type) {
        const state = type + 'Value';
        let obj={};
        obj[state] = value;

        this.setState(obj);

        this.onVisibleChange(false, type);
    }

    onDismess(type) {
        this.onVisibleChange(false, type);
    }

    onVisibleChange(value, type) {
        const showState = type + 'ShowState';
        let obj={};
        obj[showState] = value;

        this.setState(obj);
    }

    render () {
        
        return (
            <div>

                <UsePicker 
                    value={ this.state.pickerValue }
                    showState={ this.state.pickerShowState }
                    onDismess = { this.onDismess }
                    onOk={ this.onOk } 
                    clickHandler={ this.pickerClickHandler } />

                <UseMultiPicker 
                    data={ data }
                    showState={ this.state.multiShowState }
                    onDismess = { this.onDismess }
                    onOk={ this.onOk } 
                    selected={ this.getSel() }
                    clickHandler={ this.multiClickHandler } />

               <UseCascader 
                    value={ this.state.casValue }
                    data={ globalData }
                    showState={ this.state.casShowState }
                    selected={ this.getCasSel() }
                    onDismess = { this.onDismess }
                    onOk={ this.onOk }
                    clickHandler={ this.casClickHandler } />                
            </div>          
        )
    }
}  


