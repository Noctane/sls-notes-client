interface IUser {
  email: string;
  password: string;
}

interface INote {
  content: string;
  attachment?: File | null;
}

type ErrorsType = {
  [key: string]: string;
};
