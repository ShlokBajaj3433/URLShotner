const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;
const urlRouter = require('./routes/url');
const connectToDatabase = require('./connect.js');
const Url = require('./models/url.js');

connectToDatabase('mongodb://localhost:27017/urlShortener');
app.use(cors());
app.use(express.json());

app.use('/', urlRouter);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).send('Short URL not found');
    }

    res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});