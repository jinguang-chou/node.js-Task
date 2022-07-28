const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: { //구분할 ID
    type: Number,
    required: true,
    unique: true,
  },
  user: { // 이름
    type: String,
    required: true,
  },
  password: { // 수정,삭제에 쓸 비밀번호
    type: Number,
    required: true,
  },
  title: { // 제목
    type: String,
    required: true,
  },
  postcontent: { //게시글를 내용
    type: String,
    required: true,
  },
  Dates: { //시간
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);