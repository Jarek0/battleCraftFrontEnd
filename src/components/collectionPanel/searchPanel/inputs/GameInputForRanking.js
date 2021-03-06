import React from 'react';
import {styles} from '../styles'

export default class GameInputForRanking extends React.Component{

    changeInput(event){
        if(this.select.value!=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[this.select.value]
                }
            )
    }

    render(){
        return(
            <div>
                <span style={styles.optionLabel}>{this.props.name}:</span>
                <select
                    value={this.props.value}
                    style={styles.optionInput}
                    id={this.props.indexOfSearchFields}
                    ref={(control) => this.select = control}
                    onKeyDown={this.changeInput.bind(this)}
                    onChange={this.changeInput.bind(this)}
                >
                    {this.props.options}
                </select>
            </div>
        )
    }
}
