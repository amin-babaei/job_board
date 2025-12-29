
const ErrorMessage = ({ message }: { message?: string | null }) => {
  return (
    <h3 className="text-center p-5 font-extrabold text-red-500 underline underline-offset-4">
      {message}
    </h3>
  )
}

export default ErrorMessage
