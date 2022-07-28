const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { //대응 된 post의 주소
    type: Number,
    required: true,
  },
  commentId: { // comment의 주소
    type: Number,
    required: true,
    unique: true,
  },
  user: { //이름
    type: String,
    required: true,
  },
  password: { // 수정,삭제에 쓸 비밀번호
    type: Number,
    required: true,
  },
  content: { //내용
    type: String,
    required: true,
  },
  Dates: { //시간
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);