import axios from 'axios';
import React from 'react';

import ReactScrollbar from 'react-scrollbar-js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions';


class PagePanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            message:""
        };
    }

    componentDidMount(){
        this.pageNumberInput.value=this.props.pageRequest.pageRequest.page+1;
        this.pageSizeInput.value=this.props.pageRequest.pageRequest.size;
    }

    preparePagesButtons(){
        let pagesButtons = [];
        for(let i=0;i<this.props.page.totalPages;i++)
        {
            pagesButtons.push(<button onClick={()=>this.changePage(i)} key={'pageButton'+i} type="button" className="btn btn-default">{i+1}</button>);
        }
        return pagesButtons;
    }

    changePageSize(){
        if(this.pageSizeInput.value<=10 && this.pageSizeInput.value>=1)
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.size=this.pageSizeInput.value;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.setState({message:"Page size must be between 1 and 10"});
            this.pageSizeInput.value=this.props.pageRequest.pageRequest.size;
        }
    }

    changePageByInput(){
        if(this.pageNumberInput.value-1<this.props.page.totalPages && this.pageNumberInput.value-1>=0)
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.page=this.pageNumberInput.value-1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.setState({message:"Page "+this.pageNumberInput.value+" don't exist"});
            this.pageNumberInput.value=this.props.pageRequest.pageRequest.page+1;
        }
    }

    changePage(number){
        if(number<this.props.page.totalPages && number>=0) {
            let pageRequest = this.props.pageRequest;
            pageRequest.pageRequest.page = number;
            this.pageNumberInput.value = number+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.setState({message:"Page "+number+" don't exist"});
        }
    }

    nextPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.setState({message:"Page "+(pageRequest.pageRequest.page+2)+" don't exist"});
        }
    }

    previousPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.setState({message:"Page "+(pageRequest.pageRequest.page)+" don't exist"});
        }
    }

    render(){

        let pagesButtons = [];

        if(this.props.page.totalPages!==undefined)
        {
            pagesButtons=this.preparePagesButtons();
        }


        const myScrollbar = {
            width: "100%",
        };

        return (
            <div className="row">
                <div className="form-group">
                    <form className="form-inline">
                        <button onClick={() => this.previousPage()}  type="button" className="btn btn-default"><span className="glyphicon glyphicon-chevron-left"></span></button>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button  type="button" className="btn btn-default">Page number:</button>
                            </span>
                            <input ref={(control) => this.pageNumberInput = control} type="text" className="form-control" placeholder="Page number"/>
                            <span className="input-group-btn">
                                <button onClick={() => this.changePageByInput()} type="button" className="btn btn-default"><span className="glyphicon glyphicon-share-alt"></span></button>
                            </span>
                        </div>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-default">Page size:</button>
                            </span>
                            <input ref={(control) => this.pageSizeInput = control} type="text" className="form-control" placeholder="Page size"/>
                            <span className="input-group-btn">
                                <button onClick={() => this.changePageSize()} type="button" className="btn btn-default"><span className="glyphicon glyphicon-ok"></span></button>
                            </span>
                        </div>
                        <button onClick={() => this.nextPage()} type="button" className="btn btn-default"><span className="glyphicon glyphicon-chevron-right"></span></button>
                    </form>
                    <ReactScrollbar style={myScrollbar}>
                        <div>{pagesButtons}</div>
                    </ReactScrollbar>
                </div>
            </div>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PagePanel );
