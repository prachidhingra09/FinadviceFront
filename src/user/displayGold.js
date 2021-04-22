import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { VictoryLine, VictoryChart, VictoryAxis,VictoryTheme,VictoryClipContainer } from 'victory';
import {goldList} from '../auth'
class displayGold extends Component {
    constructor() {
        super()
        this.state = {
            goldValues: [0],
            goldDict : []
        }
    }

    componentDidMount () {
        goldList().then(data => {
            console.log(data)
            console.log("hi")
            this.setState({goldValues: data})
            var i=0,temp=[];
            for(i=1;i<data.length;i++){
                temp.push({x:i,y:data[i]});
            }
            this.setState({goldDict:temp});
        })

    }


    renderPosts = (goldDict) => {
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
                      data={goldDict}
                />
                </VictoryChart>
            </div>
            </div>
            
            
        </div>
        )
    }

    render() {

        const {goldDict,goldValues} = this.state;
        return (
            <div className = "container">
                <h2 style={{fontFamily: "Italic"}} className = "mt-5 mb-5 bg-light" >{!goldValues.length ? "Loading..." : "" }</h2>
                <h3>Gold Trends for next 21 Days</h3>
                {this.renderPosts(goldDict)}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}

export default displayGold;