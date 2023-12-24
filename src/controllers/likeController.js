import commonError from '../constants/errorConstant.js';
import CustomError from '../middleware/errorHandler.js';
import * as likeService from '../services/likeService.js';
import { createAlarm } from '../services/alarmService.js';

// 1. 찜한 코스 전체 조회
export async function getAllLikedPosts(req, res) {
  const userId = req.userId;
  const likedPosts = await likeService.getAllLikedPosts(userId);

  if (!likedPosts) {
    throw new CustomError(commonError.LIKE_UNKNOWN_ERROR, '찜을 찾을 수 없습니다.', {
      statusCode: 404,
    });
  }

  res.status(200).json({ likedPosts });
}

// 2. 특정 게시물에 찜하기
export async function createLike(req, res) {
  const userId = req.userId;
  const postId = req.params.postId;
  const like = await likeService.createLike(userId, postId);

  if (!like) {
    throw new CustomError(commonError.LIKE_UNKNOWN_ERROR, '찜을 찾을 수 없습니다.', {
      statusCode: 404,
    });
  }

  await createAlarm(postId, userId, 'like'); // 알림 생성
  res.status(201).json(like);
}

// 3. 특정 게시물에 찜 취소
export async function deleteLike(req, res) {
  const userId = req.userId;
  const postId = req.params.postId;
  await likeService.deleteLike(userId, postId);

  res.status(200).json({ message: '찜이 삭제되었습니다.' });
}

// 4. 찜하기 전체 취소
export async function deleteAllLikes(req, res) {
  const userId = req.userId;
  await likeService.deleteAllLikes(userId);

  res.status(200).json({ message: '찜이 삭제되었습니다.' });
}
