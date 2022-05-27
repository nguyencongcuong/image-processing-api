import routes from './routes';
import express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app