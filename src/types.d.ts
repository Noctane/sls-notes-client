interface IUser {
  email: string;
  password: string;
}

interface INewNote {
  content: string;
  attachment?: File | null;
}
interface INote {
  content: string;
  createdAt: number;
  noteId: string;
  userId: string;
}

type ErrorsType = {
  [key: string]: string;
};
