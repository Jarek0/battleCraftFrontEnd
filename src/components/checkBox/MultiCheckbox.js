import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/actions/index';

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        };
    }

    componentDidMount(){
        if(this.props.page.content.length===0)
        {
            this.setState({checked : false});
            return;
        }
        let uncheckedElements=this.props.page.content.filter(element => element.checked===false);
        if(uncheckedElements.length>0)
            this.setState({checked: false});
        else
            this.setState({checked: true});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page!==undefined && nextProps.page !== this.props.page) {
            let uncheckedElements=nextProps.page.content.filter(element => element.checked===false);
            if(uncheckedElements.length>0)
                this.setState({checked: false});
            else
                this.setState({checked: true});
        }
    }

    render(){
        return(
            <input type="checkbox"
                   onClick={
                       () => {
                           let checked=this.state.checked;
                           checked=!checked;
                           this.setState({checked:checked});
                           this.props.checkAllElements(checked);
                       }
                   }
                   checked={this.state.checked}/>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( MultiCheckbox );

