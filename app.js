const express = require("express");
const connect = require("./schemas"); //index는 특이하게 생략가능
const app = express();
const port = 3000;

connect();
// 서버 3000 열고 schemas에 연결.. 

const commentsRouter = require("./routes/comments")
const postsRouter = require("./routes/posts")
// routes에서 데이터를 가져온다.
const requestMiddleware = (req, res, next)=>{ //시간
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};
app.use(requestMiddleware); // URL이 실행된 시간을 표시.


app.use(express.json());


app.use("/api", [ postsRouter ]);
app.use("/api", [ commentsRouter ]); //commentsRouter,
// router에서 데이터를 가져온다.

app.get("/",(req,res)=> {
    res.send("hello World")
})

app.listen(port,() => {
    console.log(port,"서버가 켜졌다.")
});