/**
 * A component to show/hide variable exploration when hovering over a variable
 * in the source code
 */

import React from 'react';
import InferiorProgramInfo from './InferiorProgramInfo.jsx';
import Breakpoints from './Breakpoints.jsx';
import Expressions from './Expressions.jsx';
import Locals from './Locals.jsx';
import Tree from './Tree.js';
import Registers from './Registers.jsx';
import Threads from './Threads.jsx';
import Memory from './Memory.jsx';
import GdbMiOutput from './GdbMiOutput.jsx';
import constants from './constants.js';

class Collapser extends React.Component {
    static defaultProps = { collapsed: false, id: '' }
    constructor(props){
        super()
        this.state = {collapsed: props.collapsed}
    }
    toggle_visibility(){
        this.setState({'collapsed': !this.state.collapsed})
    }
    render(){
        return(
            <div id={this.props.id}>
                <div className='pointer titlebar' onClick={this.toggle_visibility.bind(this)}>
                    <span
                        className={`glyphicon glyphicon-chevron-${this.state.collapsed ? 'right' : 'down'}`}
                        style={{marginRight: '6px'}}
                    />
                    <span className='lighttext'>{this.props.title}</span>
                </div>

                <div className={this.state.collapsed ? 'hidden' : ''}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}


class RightSidebar extends React.Component {
    constructor(){
        super()
        // this.state = store._store
        // store.subscribe(this._store_change_callback.bind(this))
    }

    // _store_change_callback(keys){
    //     if(_.intersection(['expressions'], keys).length){
    //         this.setState(store._store)
    //     }
    // }
    render(){
        let input_style = {'display': 'inline', width: '100px', padding: '6px 6px', height: '25px', fontSize: '1em'}
        , mi_output = ''
        if (this.props.debug){
            mi_output = <Collapser title='gdb mi output' content={<GdbMiOutput id='gdb_mi_output' />} />
        }

        return (<div>
            <Collapser title='threads' content={
                <div>
                    <InferiorProgramInfo signals={this.props.signals} />
                    <Threads/>
                </div>}/>

            <Collapser id='locals' title='local variables' content={<Locals />} />
            <Collapser id='expressions' title='expressions' content={<Expressions />} />
            <Collapser title='Tree' content={
                <div>
                    <input id='tree_width' className='form-control' placeholder='width (px)' style={input_style} />
                    <input id='tree_height' className='form-control' placeholder='height (px)' style={input_style} />
                    <div id={constants.tree_component_id} />
                </div>
            } />
            <Collapser id='memory' title='memory' content={
                <div>
                    <input id='memory_start_address' className='form-control' placeholder='start address (hex)' style={input_style} />
                    <input id='memory_end_address' className='form-control' placeholder='end address (hex)' style={input_style} />
                    <input id='memory_bytes_per_line' className='form-control' placeholder='bytes per line (dec)' style={input_style} />
                    <Memory />
                </div>
            } />
            <Collapser title='breakpoints' content={<Breakpoints />} />
            <Collapser title='registers' content={<Registers />} />
            {mi_output}

        </div>)
    }
    componentDidMount(){
        Tree.init()
    }
}
export default RightSidebar
