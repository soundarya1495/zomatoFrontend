import React from 'react';
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component{
    render(){
        const {mealtypeData} = this.props;
        // console.log(mealtypeData);
        return(
            <div>

                <div className="container bottomsection">
                    <h1 className="qs-heading">Quick searche</h1>
                    <h3 className="qs-subheading">Discover restaurants by type of meal</h3>
                    <div className="qs-boxes-containers row">
                    {mealtypeData .map((item,index) =>{
                        return(
                        <QuickSearchItem 
                        key={index}
                        imgsrc = {item.image}
                        title={item.name}
                        description = {item.content}
                        id={item.meal_type}
                        /> 
                    )
                })}
                                      
                    </div>
                </div>

            </div>
        )
    }
}

export default QuickSearch;