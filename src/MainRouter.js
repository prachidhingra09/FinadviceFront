import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Users from './user/Users';
import NewPost from './posts/NewPost';
import SinglePost from './posts/SinglePost';
import DeletePost from './posts/DeletePost';
import EditPost from './posts/EditPost';
import chatdisplay from './user/chatdisplay';
import expensedisplay from './user/expensedisplay';
import getExpense from './user/getExpense';
import DeleteExpense from './user/DeleteExpense';
import displayGold from './user/displayGold';
import displayReminder from './user/displayReminder';
import DeleteReminder from './user/DeleteReminder';
import editReminder from './user/editReminder';
const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route exact path="/post/create" component = {NewPost}/>
            <Route exact path="/post/:postId" component = {SinglePost}></Route>
            <Route exact path="/post/edit/:postId" component = {EditPost}/>
            <Route exact path="/expense/delete/:postId" component = {DeleteExpense}/>
            <Route exact path="/users" component = {Users}></Route>
            <Route exact path="/signup" component = {Signup}></Route>
            <Route exact path="/signin" component = {Signin}></Route>
            <Route exact path="/chat" component = {chatdisplay}></Route>
            <Route exact path="/expense/:postId" component = {expensedisplay}></Route>
            <Route exact path="/showexpense" component = {getExpense}></Route>
            <Route exact path="/gold" component = {displayGold}></Route>
            <Route exact path="/reminder" component = {displayReminder}></Route>
            <Route exact path="/reminder/delete/:postId" component = {DeleteReminder}></Route>
            <Route exact path="/reminder/:postId" component = {editReminder}></Route>
        </Switch>
    </div>
)

export default MainRouter;