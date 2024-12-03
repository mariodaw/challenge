const express = require("express");
const app = express();
const PORT = 8080;
const { MONGO_URI } = require("./config/keys");
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

const { dbConnection } = require("./config/config")


app.use("/tasks",require("./routes/tasks"))



dbConnection()



app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))

app.listen(PORT, () => console.log("Servidor levantado en el puerto" + 8080));