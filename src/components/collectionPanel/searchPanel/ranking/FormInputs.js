import React from 'react';

import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import DateInput from './../inputs/DateInput'
import GameInputForRanking from './../inputs/GameInputForRanking'

import {resp, styles} from '../styles'
import {css} from 'aphrodite';

import findGameName from '../../../../main/functions/findGameName'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

import {provinces} from "../../../../main/consts/provinces";
import createOptions from '../../../../main/functions/createOptions'

import {serverName} from "../../../../main/consts/server";
import axios from 'axios'

class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            gameName:findGameName(this.props.pageRequest.searchCriteria),
            tournamentsGames:[],
            searchFormField: {
                "name":{},
                "province":{},
                "city":{},
                "game":{},
                "dateOfStart":{},
                "dateOfEnd":{},
            }
        }
    }

    async componentDidMount(){
        this.props.startLoading("Fetching games names...");
        await axios.get(serverName+`get/allGames/names`)
            .then(res => {
                this.props.stopLoading();
                this.setState({tournamentsGames:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
        this.setDefaultGameSearchCriteria();
    }

    setDefaultGameSearchCriteria(){
        this.changeSearchForm(
            "game",
            {
                "keys":["turn","tournament","game","name"],
                "operation":":",
                "value":[this.state.gameName]
            }
        );
    }

    preparetournamentGamesOptions(){
        let tournamentGamesOptions = [];
        if(this.state.tournamentsGames!==undefined) {
            this.state.tournamentsGames.forEach(
                tournamentGame => {
                    tournamentGamesOptions.push(<option value={tournamentGame} key={tournamentGame}>{tournamentGame}</option>);
                }
            );
        }
        return tournamentGamesOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let provincesOptions = createOptions(provinces);
        let tournamentGamesOptions = this.preparetournamentGamesOptions();

        return(
            <div>
                <div className={css(resp.optionContent)}>
                    <TextInput
                        name = "Name"
                        placeholder = "Jarek123"
                        keys = {["players","player","name"]}
                        operation = ":"
                        indexOfSearchFields = "Name"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <TextInput
                            name = "tournaments city"
                            placeholder = "Lublin"
                            keys = {["turn","tournament","address", "city"]}
                            operation = ":"
                            indexOfSearchFields = "city"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <SelectInput
                            name = "tournaments province"
                            keys = {["turn","tournament","address", "province"]}
                            operation = ":"
                            indexOfSearchFields = "province"
                            options = {provincesOptions}
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                </div>
                <div className={css(resp.optionContent)}>
                    <GameInputForRanking
                        value = {this.state.gameName}
                        name = "Game"
                        keys = {["turn","tournament","game","name"]}
                        operation = ":"
                        indexOfSearchFields = "game"
                        options = {tournamentGamesOptions}
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <DateInput
                            name = "Date from"
                            keys = {["turn","tournament","dateOfStart"]}
                            operation = ">"
                            indexOfSearchFields = "dateOfStart"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <DateInput
                            name = "Date to"
                            keys = {["turn","tournament","dateOfEnd"]}
                            operation = "<"
                            indexOfSearchFields = "dateOfEnd"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                </div>
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button">Search</button>
                <button onClick={()=>this.props.hide()}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button">Cancel</button>
            </div>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormInputs );