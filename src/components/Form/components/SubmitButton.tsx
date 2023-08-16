interface SubmitButtonProps {
  buttonText: string
}

export function SubmitButton ({ buttonText }: SubmitButtonProps) {
  return <button type='submit'>{buttonText}</button>
}
