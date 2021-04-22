import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Gold Prediction",
      handler: props.actionProvider.goldhandler,
      id: 1,
    },
    { text: "Mutual Funds",
      handler: props.actionProvider.handleFinManage,
    id: 2
    },
    { text: "Add Reminder",
      handler: props.actionProvider.handleAddReminder,
    id: 3
    },
    { text: "Add Expense",
      handler: props.actionProvider.handleAddExpense,
    id: 4
    },
    
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;