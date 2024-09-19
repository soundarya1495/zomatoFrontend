import React from 'react';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component{
    handlemealtype =()=>{
        this.props.history.push(`/filter?mealType=${this.props.title}&mealtypeId=${this.props.id}`);
    }

    render(){
        // console.log(this.props.title);
        return(
            <div className="col-sm-12 col-md-6 col-lg-4 qs-box-containers" onClick={this.handlemealtype}>
            <img src={this.props.imgsrc} className="qa-image" />
            <h4 className="qs-item-heading">{this.props.title}</h4>
            <p className="qs-item-description">{this.props.description}</p>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);