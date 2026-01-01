const express = require('express');
const app = express();
app.use(express.json());

const PORT = 9999;
const SERVICE_NAME = 'mock-user-access-service';

console.log(`Starting mock ${SERVICE_NAME} on port ${PORT}`);

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP', 
    service: SERVICE_NAME,
    timestamp: new Date().toISOString()
  });
});

// Mock operations
app.post('/health', (req, res) => {
  res.json({ 
    result: 'health_check_success',
    service: SERVICE_NAME,
    operation: 'health'
  });
});

app.post('/getUser', (req, res) => {
  res.json({ 
    result: 'user_data',
    userId: req.body.userId || 'unknown',
    service: SERVICE_NAME
  });
});

app.post('/authenticate', (req, res) => {
  res.json({ 
    result: 'auth_success',
    username: req.body.username || 'unknown',
    service: SERVICE_NAME
  });
});

app.listen(PORT, () => {
  console.log(`Mock service listening on port ${PORT}`);
  console.log('Health: http://localhost:' + PORT + '/health');
  console.log('Operations: health, getUser, authenticate');
});