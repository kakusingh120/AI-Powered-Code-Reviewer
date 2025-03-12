const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();



const port = 8080;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`); 
});