interface Email {
  id: string;
  senderId: string;
  recipientIds: string[];
  subject: string;
  body: string;
  attachment: string[];
  isRead: boolean;
  isStarred: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  createdAt: number;
  updatedAt: number;
};

export default Email;