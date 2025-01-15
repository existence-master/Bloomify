import connect  from "@utils/db"; // Adjust this path based on your project structure
import Chat from "@models/Chat"; // Replace with the correct model import

export async function DELETE(req) {
  try {
    // Parse the query parameter
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Chat ID is required" }), {
        status: 400,
      });
    }

    // Connect to the database
    await connect();

    // Find and delete the chat by ID
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return new Response(JSON.stringify({ message: "Chat not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Chat deleted successfully", chat: deletedChat }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chat:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
