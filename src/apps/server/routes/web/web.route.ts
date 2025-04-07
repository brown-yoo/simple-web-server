import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', async (req, res) => {
  const filePath = path.join(__dirname, '../../../../assets/index.html');
  
  res.setHeader('Content-Type', 'text/html').sendFile(filePath);
});

export default router;