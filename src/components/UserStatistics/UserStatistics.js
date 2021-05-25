import React, {Component} from 'react'; 
import './UserStatistics.css';

export default class UserStatistics extends Component{
    state = {
        treesAdded: 7,
        treesDiffer: 3
    }
    render(){
        return(
                <section className="user-statistics">
                    <div className="tree-stat">
                        <div className="icon-container">
                            <i className="fa fa-tree" aria-hidden="true"></i>
                        </div>
                        <div className="trees-info">
                            <span className="trees-summary">{this.state.treesAdded}</span>
                            <span className="trees-comment">деревьев добавлено</span>
                        </div>
                    </div>
                    <div className="tree-stat">
                        <div className="icon-container">
                            <i className="fa fa-pagelines" aria-hidden="true"></i>
                        </div>
                        <div className="trees-info">
                            <span className="trees-summary">{this.state.treesDiffer}</span>
                            <span className="trees-comment">добавлено различных деревьев</span>
                        </div>
                    </div>
                </section>
        )
    }
}