export default async function handler(req, res) {
    try {
      const { fileUrl } = req.body;
  
      if (!fileUrl) {
        return res.status(400).json({ error: "Missing fileUrl parameter" });
      }
  
      const response = await fetch(fileUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
  
      // Convert response to buffer
      const buffer = await response.arrayBuffer();
  
      // Extract filename from URL
      const fileName = fileUrl.split('/').pop() || "download.xlsx";
  
      // Set headers for file download
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
      res.setHeader("Content-Length", buffer.byteLength);
  
      // Send file as a binary response
      res.status(200).send(Buffer.from(buffer));
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  