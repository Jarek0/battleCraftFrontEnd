import React from 'react';

import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import SelectInput from '../../inputs/SelectInput'

import ValidationErrorMessage from "../../outputs/ValidationErrorMessage";

import {provinces} from '../../../../main/consts/provinces'

export default class AddressTab extends React.Component{
    render(){
        let inputsDisabled = this.props.mode === 'get';
        return(
            <div>
                <SelectInput
                    value={this.props.entity["province"]}
                    fieldName="province"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Province"
                    disabled = {inputsDisabled}
                    options={provinces}/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["province"]}/>
                <TextInput
                    value={this.props.entity["city"]}
                    fieldName="city"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="City"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["city"]}/>
                <TextInput
                    value={this.props.entity["street"]}
                    fieldName="street"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="Street"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["street"]}/>
                <TextInput
                    value={this.props.entity["zipCode"]}
                    fieldName="zipCode"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="ZIP code"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["zipCode"]}/>
                <TextArea
                    value={this.props.entity["description"]}
                    fieldName="description"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="Description"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["description"]}/>
            </div>
        )
    }
}