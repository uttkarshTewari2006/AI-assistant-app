// Import necessary modules if needed
export async function POST(req) {
  try {
    const body = await req.json();
    // Handle the request body here

    return new Response(JSON.stringify({ message: "Success", data: body }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Handle other methods if necessary
export function GET(req) {
  return new Response(`Method ${req.method} Not Allowed`, {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
