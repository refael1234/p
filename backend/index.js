import "./db/connection.js"
import app from "./app.js"
import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./controllers/auth.js"
import jwt from "jsonwebtoken"
import cors from "cors"
import fs from "fs"

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions));


app.use("/auth", authRouter)


app.get("/get-user", (req, res) => {
    const token = req.cookies?.token

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.PRIVATE_ACCESS_KEY, (err, payload) => {
        if (err) return res.sendStatus(401)
        else return res.send(payload)
    })

})


function catchAll(error, req, res, next) {
    if (parseInt(error.status) >= 500) {
        let logMessage =
            `\n****************************************************************************** 
server failed, error code: ${error.status} , with message: ${error.message} 
****************************************************************************** `

        fs.appendFile(process.cwd() + "/utils/log.txt", logMessage, (err) => err && console.error(err))
        res.send("there has been an error, please try again..")
    }
}

app.use(catchAll)


app.listen(5000, () => {
    console.log("listening on port 5000...")
})