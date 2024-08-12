"use client";
//import Image from "next/image";
//import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Button, Typography } from '@mui/material';


export default function Home() {
  const [content, setContent] = useState();
  const [responses, SetResponses] = useState([
    "Hello, and welcome to AI assistant. What can I help you with?",
    "test",
  ]);

  const { data: session } = useSession();

  if (!session) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Please sign in to access the chat
        </Typography>
        <Button variant="contained" onClick={() => signIn()}>
          Sign in
        </Button>
      </Box>
    );
  }

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-between p-4 pb-7 sm:p-24 sm:p-30 w-full">
      <div className="flex flex-col items-right rounded-lg w-full min-h-full bg-slate-400">
        {responses.map((item) => (
          <div className="bg-slate-300 p-4 rounded-lg m-4"> {item} </div>
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
    </Box>
  );
}
