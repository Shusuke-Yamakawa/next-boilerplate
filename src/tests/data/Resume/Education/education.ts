import {VALIDATION_ERROR_RULE} from '@/constants/messages'

/**
 * 学歴のテストデータ
 * @package
 */
export const education: any = {
  items: [
    {
      id: 1,
      schoolGradeType: 'MASTERS',
      nameJa: '東洋大学',
      nameEn: 'toyo univ',
      departmentJa: '法学部',
      departmentEn: 'legal',
      graduationYear: 2012,
      graduationMonth: 3,
    },
    {
      id: 2,
      schoolGradeType: 'BACHELORS',
      nameJa: '東京大学',
      nameEn: 'tokyo univ',
      departmentJa: '経済学部',
      departmentEn: 'keizai',
      graduationYear: 2010,
      graduationMonth: 4,
    },
  ],
}

/**
 * 学歴のテストデータ（英語なし）
 * @package
 */
export const educationNoneEnglish: any = {
  items: [
    {
      id: 1,
      schoolGradeType: 'MASTERS',
      nameJa: '東洋大学',
      nameEn: null,
      departmentJa: '法学部',
      departmentEn: null,
      graduationYear: 2012,
      graduationMonth: 3,
    },
  ],
}

/**
 * 学歴のテストデータ（必須のみ設定）
 * @package
 */
export const educationOnlyRequired: any = {
  items: [
    {
      id: 1,
      schoolGradeType: 'MASTERS',
      nameJa: '東洋大学',
      nameEn: null,
      departmentJa: null,
      departmentEn: null,
      graduationYear: null,
      graduationMonth: null,
    },
  ],
}

/**
 * 学歴のテストデータ（学校名と学部学科が最大文字数）
 * @package
 */
export const educationThatEnteredMaxLength: any = {
  items: [
    {
      id: 1,
      schoolGradeType: 'MASTERS',
      nameJa: 'あ'.repeat(VALIDATION_ERROR_RULE.MAX_LENGTH_TEXT_INPUT),
      nameEn: null,
      departmentJa: 'い'.repeat(VALIDATION_ERROR_RULE.MAX_LENGTH_TEXT_INPUT),
      departmentEn: null,
      graduationYear: null,
      graduationMonth: null,
    },
  ],
}
