/**
 * API共通のURL
 */
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`

/**
 * レジュメ関連APIのURL
 */
export const RESUME_URL = {
  RESUME_ME: '/resumes/me',
  EDUCATION_PUT: '/resumes/me/education',
  MASTER_SCHOOL: '/master/schools',
} as const
