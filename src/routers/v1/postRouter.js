import express from 'express';
import * as postController from '../../controllers/postController.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import validator from '../../middleware/validator.js';
import { post } from '../../middleware/validators/post.js';
import { isAuth } from '../../middleware/isAuth.js';

const postRouter = express.Router();

// 전체 게시글 조회 (메인페이지)
postRouter.get('/', asyncHandler(postController.getPosts));

// 특정 사용자의 전체 게시글 조회
postRouter.get('/my-page', isAuth, asyncHandler(postController.getAllPostsByUserId));

// 게시글 세부 일정 조회 (상세페이지)
postRouter.get('/:postId', asyncHandler(postController.getPostById));

// 게시글 생성
postRouter.post('/', isAuth, validator(post), asyncHandler(postController.createPost));

// 게시글 수정
postRouter.put('/:postId', isAuth, validator(post), asyncHandler(postController.updatePost));

// 게시글 삭제
postRouter.delete('/:postId', asyncHandler(postController.deletePost));

export default postRouter;
