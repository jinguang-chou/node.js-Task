const express = require("express");
const Posts = require("../schemas/post")
const Comments = require("../schemas/comment");
const router = express.Router();

// router.get("/comments/:postId", async (req, res) => { 
//   const comments = await Comments.find();
//   const postIds = comments.map((comment) => comment.postId);//comment에 정의된 postId 를 보고 찾아서
//   const posts = await Comments.find({ postId: postIds }).select("postId commentId user content Dates");// posts에 정의한다. 원하는 postId 값을 가진값

//   const results = comments.map((comment) => {
// 		return {
// 			content: comment.content,
// 			posts: posts.find((item) => item.postId === comment.postId)
// 		};
//   })
//   const result = results

//   res.json({
//     comments : result,
//   });
// });

router.get("/comments/:postId", async (req, res) => {//게시물 조회 (제목, 작성자명, 작성날자)
    const comments = await Comments.find().select("postId commentId user content Dates");
    const comment = comments.reverse();
    res.json({ 
        comment, 
    });
});

router.delete("/comments/:commentId", async (req, res) => { // 댓글 삭제 
    const { commentId } = req.params;
  
    const comment = await Comments.find({ commentId: Number(commentId) });
    if  (comment.length > 0) {
      await Comments.deleteOne({ commentId: Number(commentId) });
      res.json({ success: true, Message: "댓글을 삭제하였습니다." });
    }
    res.status(400).json({ success: true, Message: "댓글이 없습니다." });
});

router.put("/comments/:commentId", async (req, res) => { // 댓글 수정
    const { commentId } = req.params;
    const { password, content } = req.body; 

    const Check_comment = await Comments.find({ commentId: Number(commentId) });
    if (!Check_comment.length) {
      return res.status(400).json({ success: false, errorMessage: "존재 하지 않는 댓글입니다." });
    }

    await Comments.updateOne({ commentId: Number(commentId) }, { $set: { content } })
    
  
    res.json({ success: true, Message: "댓글을 수정 했습니다." });
});

router.post("/comments/:postId", async (req, res) => { //생성
    const { postId } = req.params;
    const { commentId, user, password, content } = req.body;
  
    const Check_comment = await Comments.find({ commentId: Number(commentId) });
    if (Check_comment.length) {
      return res.status(400).json({ success: false, errorMessage: "댓글이 같은 Id로 생성" });
    }
    
  
    await Comments.create({ postId: Number(postId), commentId, user, password, content })
    .catch((err) => {
        return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요" })
    });
  
    res.json({ success: true , message: "댓글을 생성하였습니다."});
  });

module.exports = router;