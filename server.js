const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;
const path = require('path');

let bestReaction = { name: '', time: Infinity };

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  const { name, time } = req.body;
  console.log(`Reaction time: ${name} - ${time.toFixed(0)}ms`);

  if (time < bestReaction.time) {
    bestReaction = { name, time };
    console.log(`New best reaction time: ${name} - ${time.toFixed(0)}ms`);
  }

  res.json(bestReaction);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
