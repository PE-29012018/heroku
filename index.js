const { exec } = require('child_process');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy Webserver, damit Heroku den Dyno nicht wegen Timeout abschießt
app.get('/', (req, res) => {
  res.send('OpenClaw Heroku Gateway is running!');
});

app.listen(PORT, () => {
  console.log(`Heroku Web-Wrapper listening on port ${PORT}`);
  
  // Starte OpenClaw Gateway im Hintergrund
  console.log('Starting OpenClaw Gateway...');
  const claw = exec('npx openclaw start'); 

  claw.stdout.on('data', data => console.log(`[OpenClaw]: ${data}`));
  claw.stderr.on('data', data => console.error(`[OpenClaw Error]: ${data}`));
});
