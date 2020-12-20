import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./styles.scss";

const Bob =
  "https://images.pexels.com/photos/53487/james-stewart-man-person-actor-53487.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const John =
  "https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const Jane =
  "https://images.pexels.com/photos/53453/marilyn-monroe-woman-actress-pretty-53453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const Grace =
  "https://images.pexels.com/photos/60712/fashion-girl-sexy-women-60712.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

const MESSAGES = [
  { id: 0, avatar: Bob, author: "Bob", message: "dolor sit amet, consect" },
  {
    id: 1,
    avatar: John,
    author: "John",
    message: "sed do eiusmod tempor incididunt ",
    isSwiped: false
  },
  {
    id: 2,
    avatar: Jane,
    author: "Jane",
    message: "Excepteur sint occaecat cupidatat",
    isSwiped: false
  },
  {
    id: 3,
    avatar: Grace,
    author: "Grace",
    message: "cillum dolore eu fugiat nu",
    isSwiped: false
  },
  {
    id: 4,
    avatar: John,
    author: "John",
    message: "sed do eiusmod tempor incididunt ",
    isSwiped: false
  },
  {
    id: 5,
    avatar: Jane,
    author: "Jane",
    message: "Excepteur sint occaecat cupidatat",
    isSwiped: false
  },
  {
    id: 6,
    avatar: Grace,
    author: "Grace",
    message: "cillum dolore eu fugiat nu",
    isSwiped: false
  }
];

const DELETE_BTN_WIDTH = 70;

const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 };
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0
    }
  }
};

const App = () => {
  const [messagesList, setMessagesList] = useState(MESSAGES);

  const handleRemoveItem = (messageId) => {
    const filteredMessages = messagesList.filter(
      (message) => message.id !== messageId
    );
    // console.log(filteredMessages);
    setMessagesList(filteredMessages);
  };

  const handleDragEnd = (info, messageId) => {
    const dragDistance = info.point.x;
    const messageSwiped = messagesList.filter(
      (message) => message.id === messageId
    )[0];

    console.log(dragDistance, info);
    if (
      dragDistance < 0 &&
      dragDistance > -DELETE_BTN_WIDTH / 3 &&
      !messageSwiped.isSwiped
    ) {
      console.log("ignore");
    } else if (
      dragDistance < 0 &&
      (dragDistance < -DELETE_BTN_WIDTH * 2 ||
        (messageSwiped.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
    ) {
      const filteredMessages = messagesList.filter(
        (message) => message.id !== messageId
      );
      // console.log(filteredMessages);
      setMessagesList(filteredMessages);
    } else if (dragDistance > -DELETE_BTN_WIDTH && messageSwiped.isSwiped) {
      console.log("reset");
      const newMessagesList = messagesList.map((item) => {
        if (item.id === messageId) {
          item.isSwiped = false;
        }

        return item;
      });

      setMessagesList(newMessagesList);
    } else if (dragDistance < 0 && dragDistance <= -DELETE_BTN_WIDTH / 3) {
      console.log("prep for removal");
      const newMessagesList = messagesList.map((item) => {
        if (item.id === messageId) {
          item.isSwiped = true;
        } else {
          item.isSwiped = false;
        }

        return item;
      });

      setMessagesList(newMessagesList);
    }
  };

  return (
    <main className="screen">
      <header>
        <h1>Messages</h1>
      </header>
      <input type="text" placeholder="🔍 Search" />
      <ul>
        <AnimatePresence>
          {messagesList.map((message) => (
            <motion.li
              key={message.id}
              exit={MESSAGE_DELETE_ANIMATION}
              transition={MESSAGE_DELETE_TRANSITION}
            >
              <motion.div
                drag="x"
                // dragDirectionLock
                dragElastic={0.7}
                dragPropagation={true}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                  left: message.isSwiped ? DELETE_BTN_WIDTH * -1 : 0,
                  right: message.isSwiped ? DELETE_BTN_WIDTH : 0
                }}
                dragMomentum={false}
                animate={{ x: message.isSwiped ? DELETE_BTN_WIDTH * -1 : 0 }}
                onDragEnd={(_, info) => {
                  handleDragEnd(info, message.id);
                }}
                className={`msg-container ${
                  message.isSwiped ? "is-swiped" : ""
                }`}
              >
                <img
                  className="user-icon"
                  src={message.avatar}
                  alt="User icon"
                />
                <div className="message-text">
                  <h3>{message.author}</h3>
                  <p>{message.message}</p>
                </div>
              </motion.div>
              <div
                className="delete-btn"
                onClick={() => handleRemoveItem(message.id)}
              >
                Delete
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </main>
  );
};

export default App;
