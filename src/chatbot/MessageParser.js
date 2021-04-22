class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
      if(lowercase.includes("hello") || lowercase.includes("hi") ||lowercase.includes("help") || lowercase.includes("whats up")){
          this.actionProvider.greet();
      }
      else if(lowercase.includes("gold")){
        this.actionProvider.goldhandler();
      }
      else if(lowercase.includes("mutual")){
        this.actionProvider.handleFinManage();
      }
      else if(lowercase.includes("reminder")){
        this.actionProvider.handleAddReminder();
      }
      else if(lowercase.includes("electricity") || lowercase.includes("gas") || lowercase.includes("bill")){
        const reminder = message;
        this.actionProvider.reminderAdded(message);
        
      }
      else if(lowercase.includes("expense")){
        this.actionProvider.handleAddExpense();
      }
      else if(lowercase.includes("exp=") || lowercase.includes("inc=")){
        this.actionProvider.expenseAdded(message);
      }
      else if(lowercase.includes("bye") || lowercase.includes("by") || lowercase.includes("bie")){
        this.actionProvider.thank();
      }
      else if(lowercase.includes("thank")){
        this.actionProvider.myPleasure();
      }
      else
      {
         // console.log("random");
        this.actionProvider.defReply(); 
      }

    }
  }
  
  export default MessageParser;