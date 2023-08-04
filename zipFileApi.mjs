import express from 'express';
import multer from 'multer';
import Bull from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import Redis from 'ioredis';

const app = express();
const port = 3001;

// Redis configuration
const redisConfig = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: 'najela2503', // add password if required
  },
};

const redisClient = new Redis(redisConfig.redis);

// Bull Queue
const queue = new Bull('zipQueue', {
  redis: redisConfig,
});

// Set up Bull Board for monitoring queues
const { router: bullBoardRouter } = createBullBoard([
  new BullAdapter(queue),
]);
app.use('/admin/queues', bullBoardRouter);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const upload = multer({ storage });

// Route to receive the zip file and process it
app.post('/receiveUsers', upload.single('zipFile'), async (req, res) => {
  const { path } = req.file;

  // Assuming the zip contains JSON files with user data
  // You can read and process the files from the zip here
  // For this example, we'll just add the zip path to the queue

  try {
    await queue.add('processZip', { zipPath: path });
    res.status(200).json({ message: 'Zip file received and added to queue.' });
  } catch (error) {
    console.error('Error adding job to queue:', error);
    res.status(500).json({ error: 'Failed to add job to queue.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
