import React, { Component } from 'react';
import G6chart from './G6chart';

class IndexView extends Component {

    constructor(props) {
        super(props);
        this.state={
            list:new Set()
        }
    }
    

    addSelected=(list)=>{
        this.setState({
            list:list
        })
        console.log("asdasd", this.state.list)
    }
    render() {
        return (
            <div>
                <G6chart onSelected={this.addSelected}></G6chart>
            </div>
        );
    }
}

export default IndexView;