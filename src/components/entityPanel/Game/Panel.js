import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'

import Button from '../inputs/Button';
import PanelTitle from '../inputs/PanelTitle';
import GameDataTab from './Tabs/GameDataTab';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {serverName} from "../../../main/consts/server";
import axios from 'axios';

import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";

import validateGame from '../validators/GameValidator'

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            height : window.innerHeight,
            activeTab : "basicData",
            entity:{
                "name": "",
                "nameChange":"",
                "creatorName":"",
                "dateOfCreation": new Date(),
                "tournamentsNumber":0,
                "status":"NEW",
                "canCurrentUserEdit":false
            },
            validationErrors:{
                "name": "",
                "nameChange":"",
                "gameRules": ""
            }
        };
    }

    async componentDidMount() {
        if(this.props.mode==='edit' || this.props.mode==='get')
        {
            window.addEventListener("resize", this.updateDimensions.bind(this));
            this.props.startLoading("Fetching game...");
            await axios.get(serverName+`get/game?name=`+this.props.name,
                {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    this.setState({entity:res.data});
                    console.log("input entity: ");
                    console.log(res.data);
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error);
                });
        }
        else {
            let entity = this.state.entity;
            entity.canCurrentUserEdit = true;
            this.setState({entity:entity});
        }
    }

    updateDimensions()
    {
        this.setState({
            height : window.innerHeight,
        })
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }


    createContent(){
        return React.createElement(
            GameDataTab,
            {
                entity:this.state.entity,
                inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
                changeEntity: this.changeEntity.bind(this),
                validationErrors: this.state.validationErrors
            },
            null)
    }

    changeEntity(fieldName,value){
        let entity = this.state.entity;
        entity[fieldName] = value;
        this.setState({entity:entity});
    }

    sendEntity(){
        if(this.props.mode==='add')
        {
            let entity = this.state.entity;
            entity.name = entity.nameChange;
            this.setState({entity:entity})
        }

        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));

        delete entityToSend["creatorName"];
        delete entityToSend["dateOfCreation"];
        delete entityToSend["tournamentsNumber"];
        delete entityToSend["status"];
        delete entityToSend["canCurrentUserEdit"];

        let isEditMode = this.props.mode === 'edit';
        let gameRules = this.gameRules.files[0];

        let validationErrors = validateGame(entityToSend,gameRules,isEditMode);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            this.props.startLoading("Sending game...");
            axios.post(serverName+this.props.mode+'/'+this.props.type, entityToSend,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    let newEntity = res.data;
                    if(gameRules===undefined && isEditMode){
                        this.props.showSuccessMessage("Game: "+newEntity.name+" successfully "+this.props.mode+"ed");
                        this.props.disable();
                    }
                    else
                        this.sendGameRules(res.data,gameRules);
                })
                .catch(error => {
                    this.props.stopLoading();
                    if(error.response.data.fieldErrors===undefined){
                        this.props.showNetworkErrorMessage(error);
                    }
                    else{
                        this.setValidationErrors(error.response.data);
                    }
                });
        }
        else{
            this.setValidationErrors(validationErrors);
        }
    }

    sendGameRules(entity,gameRules){
        let formData = new FormData();
        formData.append('gameRules',gameRules);

        this.props.startLoading("Sending game rules...");
        axios.post(serverName+`/upload/game/rules?gameName=`+ entity.name,
            formData,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token,
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
            .then(res => {
                this.props.stopLoading();
                this.setState({entity:entity});
                this.props.showSuccessMessage("Game: "+entity.name+" successfully "+this.props.mode+"ed");
                this.props.disable();
            })
            .catch(error => {
                this.props.stopLoading();
                let entity = this.state.entity;
                entity.canCurrentUserEdit = true;
                this.setState({entity:entity});
                this.props.showNetworkErrorMessage(error);
            });
    }

    setValidationErrors(validationException){
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
        console.log("validation errors:");
        console.log(validationErrors);
        let validationErrorsState = this.state.validationErrors;
        for (let field in validationErrorsState) {
            if (validationErrors.hasOwnProperty(field)) {
                validationErrorsState[field] = validationErrors[field]
            }
            else{
                validationErrorsState[field] = "";
            }
        }
        this.setState({validationErrors:validationErrorsState})
    }

    render(){

        let buttons = [];
        if(this.props.mode!=='get' && this.state.entity.canCurrentUserEdit){
            buttons = [
                <Button key="cancel" text={"Cancel"} action={() => this.props.disable()}/>,
                <Button key="save" text={"Save"} action={() => {this.sendEntity()}}/>
            ]
        }
        else{
            buttons = [
                <Button key="ok" text={"Ok"} action={() => this.props.disable()}/>
            ]
        }

        return(
          <div>
          <PanelTitle name={"GAME PANEL"} />
            <div style={styles.goldAndBrownTheme} className = {css(resp.smallPanel)}>
                <div style={{maxHeight:this.state.height * 0.5}} className={css(resp.content)}>
                    {this.createContent()}
                    <div style={{position:'relative', width:'100%', height:'30px'}}>
                        {this.props.mode!=='get'  && this.state.entity.canCurrentUserEdit &&
                        <button style={styles.tableButton} className={css(resp.tableButton)}>
                            <input style={styles.fileInput}
                                   id="gameRules" type="file"
                                   ref={(ref) => this.gameRules = ref}/>
                            <div>Upload game rules</div>
                        </button>}
                    </div>
                </div>
                {buttons}
            </div>
          </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
