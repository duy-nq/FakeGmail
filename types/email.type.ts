
interface Email {
  id: string;
  sender: string;
  senderName: string;
  senderImageUrl: string;
  recipients: string[];
  subject: string;
  body: string;
  attachments: string[];
  labels: string[];
  isRead: boolean;
  isStarred: boolean;
  isDelete: boolean;
  isDraft: boolean;
  createdAt: number;
  updatedAt: number;
}

export default Email;
