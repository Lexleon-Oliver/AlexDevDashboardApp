export class OfficialLetter {
  id: number;
  title: string;
  content: string;
  sender: string;
  recipient: string;
  sentAt: string;
  receivedAt: string;

  constructor(id: number, title: string, content: string, sender: string, recipient: string, sentAt: string, receivedAt: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.sender = sender;
    this.recipient = recipient;
    this.sentAt = sentAt;
    this.receivedAt = receivedAt;
  }
}
