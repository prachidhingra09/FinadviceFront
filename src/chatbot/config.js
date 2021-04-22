import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options/Options";

const config = {
  botName : "FINADVISOR",
  initialMessages: [createChatBotMessage(`Hello ! Welcome To Finadvice.`,{
      widget : "options"
  })],
  customComponents: {
   header: () => <div style={{ backgroundColor: 'lightblue', padding: "20px", borderRadius: "3px",textAlign:"center",fontWeight:"bolder" }}>Finadvice Bot</div>
 },
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    // Overrides the chat button styles
    /*chatButton: {
      backgroundColor: "lightblue",
    },*/
  },
  widgets:[
    {
        widgetName: "options",
        widgetFunc: (props) => <Options {...props} />,
    }

  ]
}

export default config