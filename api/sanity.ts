import fetch from 'node-fetch';

export const proxyHandler = async (req, res) => {
  try {
    const response = await fetch(`https://${process.env.VITE_PROJECT_ID}.api.sanity.io/${process.env.VITE_API_VERSION}/data/${req.query}/${process.env.VITE_DATASET}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.VITE_API_TOKEN}`, // Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Sanity API: ${response.statusText}`);
    }

    // Send the response back to the frontend
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // Return error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
}

export default proxyHandler;
