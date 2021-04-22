import React , {Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import Posts from '../posts/Posts';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import './chatdisplay.css'
import {remlistByUser} from '../auth';
import {isAuthenticated} from '../auth';
/*var bill;
remlistByUser(isAuthenticated().user._id,isAuthenticated().token).then(data => {
    console.log(data);
    var headers = Object.keys(data); 
    var rows = []; 
    Object.values(data).forEach((item) => { 
    Object.values(item).forEach((val, index) => {
    rows[index] = rows[index] || [];
    rows[index].push(val); 
    });
    });
    console.log(headers);
    console.log(rows);
    var newArray = rows[1].map((e, i) => e + " due on "+(rows[2][i].split("T"))[0]);
    console.log(newArray);
    //document.getElementById("b").innerHTML = newArray;
    //document.getElementById("d").innerHTML= rows[2];
})*/
const chatdisplay = () => (
    <div className="container mt-10"  style={{alignItems:"center"}}>
        <br/><br/>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="react-chatbot-kit-chat-container" style ={{maxWidth: "1000px", display: "flex",alignItems:"center",justifyContent:"center"}}>
            <Chatbot 
                config={config}
                actionProvider = {ActionProvider}
                messageParser = {MessageParser}

            />
        </div> <br/><br/>
        </div>
    </div>
   
);
export default chatdisplay;