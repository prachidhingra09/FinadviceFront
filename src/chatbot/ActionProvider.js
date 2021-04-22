import {insertReminder} from '../auth';
import {isAuthenticated} from '../auth';
import {insertExpense} from '../auth';
import {goldList} from '../auth';
import {mutualList} from '../auth';


class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    greet = () => {
        const message = this.createChatBotMessage("hello there! How can I help you?");
        this.addMessageToState(message);
    }
    thank = () => {
        const message = this.createChatBotMessage("Hope to you soon ! Have a good day! PS. Do check your Reminders.");
        this.addMessageToState(message);
    }
    myPleasure = () => {
        const message = this.createChatBotMessage("Pleasure! Merci :)");
        this.addMessageToState(message);
    }
    defReply = () => {
        const message = this.createChatBotMessage("Sorry! I didn't get you :(");
        this.addMessageToState(message);
    }
    handlegold = () => {
        const message = this.createChatBotMessage("To predict the gold price go ahead nd click the gold prediction button",
        {
            widget: "Gold Prediction",
            loading: true,
            terminateLoading: true,
            withAvatar: true,
        });
        
        this.addMessageToState(message);
    }
    handleAddReminder = () => {
        const message = this.createChatBotMessage("what's the new reminder you want to add? Enter As : Bill Description,yyyy-mm-dd ",
        {
            widget: "Add Reminder"
        });
        this.addMessageToState(message);
    }
    reminderAdded = (message) => {
        var rem = message.split(',');
        const bill = rem[0];
        const deadline= rem[1];

    
        const newRem = {
            bill,
            deadline
        };
        //console.log(user)
        insertReminder(newRem,isAuthenticated().user._id,isAuthenticated().token);
        const msg = this.createChatBotMessage("new reminder "+ message + "successfully added!");
        this.addMessageToState(msg);

    }
    handleAddExpense = () => {
        const message = this.createChatBotMessage("Please provide your expense and income. Enter As : exp=XXXX,inc=XXXX",
        {
            widget: "Add Expense"
        });
        this.addMessageToState(message);
    }
    expenseAdded = (message) => {
        var inp = message.split(',');
        const expInp = inp[0];
        const incInp= inp[1];
        var e = expInp.split('=');
        var i = incInp.split('=');
        const expenditure = e[1];
        const income = i[1];
        const newExp = {
            income,
            expenditure
        };
        //console.log(user)
        insertExpense(newExp,isAuthenticated().user._id,isAuthenticated().token);
        const msg = this.createChatBotMessage("Expense "+ message + "successfully added!");
        this.addMessageToState(message);

    }
    goldhandler = () => {
      /*  goldList().then(data => {
            console.log(data);
        })*/
        const message = this.createChatBotMessage("Go ahead and click the Gold option in Menu Bar to get a quick glance for next 21 days trend of gold",
        {
            widget: "Gold Prediction"
        });
        this.addMessageToState(message);

    }
    handleFinManage = () => {
        mutualList().then(data => {
            console.log(data);
        })
    }
    addMessageToState = (message) => {
        this.setState(prevState => ({
            ...prevState,
            messages : [...prevState.messages,message]
        }))

    };

  }
  
  export default ActionProvider;