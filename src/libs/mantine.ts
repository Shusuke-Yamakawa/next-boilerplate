import styles from './mantine.module.css'

/**
 * Mantineに共通で適用するスタイル
 */
export const theme = {
  components: {
    InputWrapper: {
      classNames: {
        error: styles.error,
      },
    },
  },
}
