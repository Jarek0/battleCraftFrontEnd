import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../styles'
import OptionButton from './optionButton/OptionButton'

class OptionPanel extends React.Component {

    render() {
        let operations = [];
        if(!this.props.disabled){
            operations = [
                <OptionButton key={"previous"} operation={()=>this.props.previousTurn()} name={"Previous"}/>,
                <OptionButton key={"next"} operation={()=>this.props.nextTurn()} name={"Next"}/>,
                <OptionButton key={"scoreboard"} operation={()=>{this.props.scoreboard()}} name={"Scoreboard"}/>,
                <OptionButton key={"finish"} operation={()=>this.props.finishTournament()} name={"Finish"} additionalStyle={{float:'right'}}/>,
            ];
        }
        else{
            operations = [
                <OptionButton key={"scoreboard"} operation={()=>{this.props.scoreboard()}} name={"Scoreboard"}/>
            ];
        }
        return (
            <div style = {styles.buttonGroup}>
                <div style = {Object.assign({}, styles.buttonGroup, styles.buttonGroupInside)}>
                    {operations}
                </div>
            </div>
        );
    }
}

export default OptionPanel;
