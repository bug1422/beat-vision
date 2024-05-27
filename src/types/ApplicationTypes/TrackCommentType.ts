export type TrackCommentDto = {
  Id: number;
  Content: string;
  CreateDate: string;
  AuthorId: number | null;
  LikesCount: number;
  CommentType: string;
  ReplyToCommentId: number | null;
  IsCommentRemoved: boolean;
  TrackId: Number | null;
};
