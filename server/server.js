const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/dist', proxy('http://localhost:3000')); 

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
