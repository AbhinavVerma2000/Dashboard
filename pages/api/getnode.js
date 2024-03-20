import connectDb from '@/connection/mongoose';
import Node from '../../models/Node';

const handler=async(req, res)=> {
  if (req.method === 'GET') {
    try {
      const nodes = await Node.find(); // Fetch all nodes from the database
      res.status(200).json(nodes); // Respond with the fetched nodes
    } catch (err) {
      console.error('Error fetching nodes:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); // Return error if the request method is not GET
  }
}
export default connectDb(handler)