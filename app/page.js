"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [responses, setResponses] = useState([
    {
      content: "Hello, and welcome to AI assistant. What can I help you with?",
      role: "assistant",
    },
  ]);

  const sendMessage = async () => {
    const newResponses = [...responses, { content: content, role: "user" }];
    setResponses(newResponses);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResponses),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      const processText = async ({ done, value }) => {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        setResponses((prevResponses) => {
          let lastMessage = prevResponses[prevResponses.length - 1];
          let otherMessages = prevResponses.slice(0, prevResponses.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      };

      reader.read().then(processText);
    } catch (error) {
      console.error("Error fetching the response:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          content: "Error fetching the response. Please try again.",
          role: "assistant",
        },
      ]);
    }
  };

  const getString = (author) => {
    let messageClass = "text-white p-4 rounded-lg m-4 ";
    messageClass +=
      author === "assistant" ? "bg-slate-900" : "bg-white text-black";
    return messageClass;
  };

  return (
    <div className="m-10 flex h-full min-h-screen flex-col items-center justify-between p-8 pb-8 sm:p-24 w-full">
      <div className="flex flex-col items-right rounded-lg w-full h-full bg-gray-600 mb-0">
        {responses.map((item, index) => (
          <div key={index} className={getString(item.role)}>
            {item.content}
          </div>
        ))}
        <div className="flex flex-row justify-between p-2 text-center rounded w-full max-h-14 bg-gray-600 mt-auto">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded-lg p-2 w-5/6"
            placeholder="Ask anything"
          />
          <button
            onClick={sendMessage}
            className="h-full w-1/5 max-w-14 pt-0 pb-0"
          >
            <img
              className="w-full max-w-14 h-full"
              src="images/send.png"
              alt="Send"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
