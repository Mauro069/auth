import styles from './styles.module.scss'

interface SubmitButtonProps {
  buttonText: string
}

export function SubmitButton ({ buttonText }: SubmitButtonProps) {
  return (
    <button className={styles.submitButton} type='submit'>
      {buttonText}
    </button>
  )
}
