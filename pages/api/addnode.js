import Node from "../../models/Node";
import connectDb from "@/connection/mongoose";
 const handler=async(req, res)=> {
  if (req.method === "POST") {
    try {
      const newNode = await Node.create(req.body); // Create a new node document with the request body
      res.status(201).json(newNode); // Respond with the created node
    } catch (err) {
      console.error("Error adding node:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Return error if the request method is not POST
  }
}
export default connectDb(handler);