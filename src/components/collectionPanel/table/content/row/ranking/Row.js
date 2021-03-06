import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import TableAvatarCell from './../../row/tableCell/TableAvatarCell'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'
import TableRespNeutralHeader from './../../headRow/tableHeader/TableRespNeutralHeader'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'

import { ActionCreators } from '../../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Row extends React.Component{

    getColor(columnName, tournament){
        if(this.props.isColumnActive(columnName)){
                return colors["ranking"]["active"]["NORMAL"];
        }
        else{
                return colors["ranking"]["normal"]["NORMAL"];
        }
    }

    showUser(name){
        this.props.getEntity("user",name);
    }

    render(){
        return (
            <tr className={css(resp.tableRow)}>
                <TableRespNeutralHeader
                    headerName = "No."
                />
                <TableCell
                    columnName = "no"
                    color = {this.getColor("no")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.number}
                />

                <TableRespNeutralHeader
                    headerName = "avatar"
                />
                <TableAvatarCell
                    columnName = "avatar"
                    color = {this.getColor("avatar")}
                    edit = {() => this.showUser(this.props.element.name)}
                    name = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("name")}
                    sortBy = "name"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("name")}
                    headerName = "name"
                />
                <TableCell
                    columnName = "name"
                    color = {this.getColor("name")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("province")}
                    sortBy = "playerAddress.province"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("province")}
                    headerName = "province"
                />
                <TableCell
                    columnName = "province"
                    color = {this.getColor("province")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.playerProvince}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("city")}
                    sortBy = "playerAddress.city"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("city")}
                    headerName = "city"
                />
                <TableCell
                    columnName = "city"
                    color = {this.getColor("playerAddress.city")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.playerCity}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("numberOftournaments")}
                    sortBy = "numberOftournaments"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("numberOftournaments")}
                    headerName = "tournaments number"
                />
                <TableCell
                    columnName = "numberOftournaments"
                    color = {this.getColor("numberOftournaments")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.numberOftournaments}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("numberOfBattles")}
                    sortBy = "numberOfBattles"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("numberOfBattles")}
                    headerName = "Battles number"
                />
                <TableCell
                    columnName = "numberOfBattles"
                    color = {this.getColor("numberOfBattles")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.numberOfBattles}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("points")}
                    sortBy = "points"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("points")}
                    headerName = "points"
                />
                <TableCell
                    columnName = "points"
                    color = {this.getColor("points")}
                    edit = {() => this.showUser(this.props.element.name)}
                    content = {this.props.element.points}
                />
            </tr>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Row );


const resp = StyleSheet.create({
    tableRow:{
        cursor:'pointer',
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
        '@media (max-width: 900px)': {
            fontSize:'0.80em',
        },
    },

});