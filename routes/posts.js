const express = require("express")
const Posts = require("../schemas/post")
const Comments = require("../schemas/comment")
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is posts page")
  });

router.get("/posts", async (req, res) => {//게시물 조회 (제목, 작성자명, 작성날자)
    const posts = await Posts.find().select("user title Dates");
    const data = posts.reverse();
    res.json({ 
      data, 
    });
});

router.get("/posts/:postId", async (req, res) => { //상세 조회 (제목, 작성자명, 내용, 작성날자)
    const { postId } = req.params;

    const post = await Posts.find({ postId: Number(postId) }).select("user title postcontent Dates");

    res.json({
        post,
    });
});

router.put("/posts/:postId", async (req, res) =>  { // 수정 API (postId가 없는 값이면 내용이 없습니다.)
    const { postId } = req.params;                  // 페스워드가 같으면 대응하는 postId의 내용과 재목 변경
    const { password, title, postcontent } = req.body; 
    const post = await Posts.findOne({ postId: Number(postId) })
    if(!post) {
      return res.status(400).json({ success: false, errorMessage: "내용이 없습니다."})
    };

    if(post.password === Number(password)) {
      await Posts.updateOne({ postId: Number(postId) }, { $set: { title, postcontent } });
      res.json({ success: true, Message: "게시글을 수정하였습니다." });
    } 
});

router.delete("/posts/:postId", async (req, res) =>  {//제거 api 특정 주소의 이런 값이 있는 내용의 데이터 지우기
  const { postId } = req.params;
  const { password } = req.body;

  const post = await Posts.find({ postId: Number(postId) })

  if( post.length && post[0].password === Number(password) ) {
    await Posts.deleteOne({ postId: Number(postId) });
    res.json({ success: true , Message: "게시글을 삭제하였습니다." });
  }//요기까지 있는지 검사

  res.status(400).json({ success: false, errorMessage: "게시글이 없습니다."})
});


router.post("/posts", async (req, res) => { // 생성하기
	const { postId, user, password, title, postcontent } = req.body;

 
  const posts = await Posts.find({ postId });
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }
  
  const createdPosts = await Posts.create({ postId, user, password, title, postcontent });

  res.json({ posts: createdPosts,  Message: "게시글을 생성했습니다."});
});


module.exports = router;