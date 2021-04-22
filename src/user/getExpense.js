import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {explistByUser} from '../auth';
import {isAuthenticated} from '../auth';
import { VictoryLine, VictoryChart,VictoryClipContainer } from 'victory';

class getExpense extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            vizIncome : [],
            vizExpenditure : []
        }
    }

    componentDidMount () {
        explistByUser(isAuthenticated().user._id,isAuthenticated().token).then(data => {
            console.log(data)
            console.log("hi")
            this.setState({posts: data})
            var i=0,inc=[],exp=[];
            for(i=0;i<data.length;i++){
                inc.push({x:new Date(data[i].created).toDateString(),y:data[i].income});
                exp.push({x:new Date(data[i].created).toDateString(),y:data[i].expenditure});
            }
            console.log(this.posts)
            this.setState({vizIncome:inc});
            this.setState({vizExpenditure:exp});
            console.log(this.vizExpenditure)
            console.log(this.vizIncome)
           /* if(data.error) {
                console.log(data.error)
            } else {
                this.setState({posts: data})
            }*/
        })
    }


    renderPosts = (posts,vizIncome,vizExpenditure) => {
        return (
            
        <div className="row">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-left py-4">
            <div>
                <VictoryChart>
                <VictoryLine
                    groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
                    style={{
                        data: { stroke: "white" },
                        parent: { border: "px solid #ccc"}
                      }}
                    data={vizIncome}
                />
                </VictoryChart>
            </div><div>
                <VictoryChart>
                <VictoryLine
                    groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
                    style={{
                        data: { stroke: "red" },
                        parent: { border: "px solid #ccc"}
                      }}
                    data={vizExpenditure}
                />
                </VictoryChart>
            </div>
            </div>
            {posts.map((post, i) => {
                //const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                //const posterName = post.postedBy ? post.postedBy.name : "Unknown"
                return (
                    
                    <div className="card col-md-4" key = {i}>
                        <div className="card-body">

                            <h5 className="card-text">Expenditure : {post.expenditure}</h5>
                            <h5 className="card-text">Income : {post.income}</h5>
                            <br />
                            <p className="font-italic">
                                Created on : {new Date(post.created).toDateString()}
                            </p>
                            <Link to={`/expense/delete/${post._id}`} className="btn btn-raised btn-dark " style={{float :"right"}}>Delete</Link>
                            <Link to={`/expense/${post._id}`} className="btn btn-raised btn-info bt-sn" style={{float :"right"}}>Edit</Link>
                            
                        </div>
                        
                    </div> 
                    
                )              
            } )}
            
        </div>
        )
    }

    render() {

        const {posts,vizIncome,vizExpenditure} = this.state;
        return (
            <div className = "container">
                <h2 style={{fontFamily: "Italic"}} className = "mt-5 mb-5 bg-light" >{!posts.length ? "Loading..." : "" }</h2>
                {this.renderPosts(posts,vizIncome,vizExpenditure)}
            </div>
        )
    }
}

export default getExpense;