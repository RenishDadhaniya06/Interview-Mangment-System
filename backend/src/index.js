const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./router/user.js')
const cors = require('cors')



const app = express();
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);

app.listen(port,()=>{
    console.log('Server Running On Port ',port)
})