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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {session.user.name}!
      </Typography>
      <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button>
    <div className="flex h-full min-h-screen flex-col items-center justify-between p-4 pb-7 sm:p-24 sm:p-30 w-full">
      <div className="flex flex-col items-right rounded-lg w-full min-h-full bg-slate-400">
        {responses.map((item) => (
          <div className="bg-slate-300 p-4 rounded-lg m-4"> {item} </div>
        ))}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 text-center rounded w-full h-30 bg-slate-700"
        placeholder="Ask anything"
      ></input>
    </div>
    </Box>
  );
}
