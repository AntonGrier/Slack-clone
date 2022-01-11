import { apiPost } from './apiCall'

export const userLogin = (UserEmail: string, UserPassword: string) =>
  apiPost({ userLogin: true, UserEmail, UserPassword })

export const insertUser = (
  UserEmail: string,
  UserPassword: string,
  FirstName: string,
  LastName: string,
  ProfilePicture: string,
  TimezoneOffset: number,
  MoodStatus: string,
) =>
  apiPost({
    insertUser: true,
    UserEmail,
    UserPassword,
    FirstName,
    LastName,
    ProfilePicture,
    TimezoneOffset,
    MoodStatus,
  })
