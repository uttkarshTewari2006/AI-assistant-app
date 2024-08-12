import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses

//console.log(process.env.local.OPENAI_API_KEY)

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt =
  "Hi! I am a Headstarter support assistant. How can I help you today?"; // Use your own system prompt here

// POST function to handle incoming requests
export async function POST(req) {
  const data = await req.json(); // Parse the JSON body of the incoming request

  try {
    // Make a request to the Meta Llama API
    const response = await fetch("https://api.meta.com/v1/llama/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.META_LLAMA_API_KEY}`, // Use your Meta API key from environment variables
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: systemPrompt }, ...data], // Include the system prompt and user messages
        model: "llama-3.1-8b-instruct", // Specify the model to use
        stream: true, // Enable streaming responses (if supported by Meta API)
      }),
    });

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader(); // Get a reader to read the response body
        const decoder = new TextDecoder(); // Create a decoder to decode the response text
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const content = decoder.decode(value);
            controller.enqueue(new TextEncoder().encode(content));
          }
        } catch (err) {
          controller.error(err); // Handle any errors that occur during streaming
        } finally {
          controller.close(); // Close the stream when done
        }
      },
    });

    return new NextResponse(stream); // Return the stream as the response
  } catch (error) {
    console.error("Error fetching from Meta Llama API:", error);
    return NextResponse.error();
  }
}
