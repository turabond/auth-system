export const FormError = ({ message }: { message: string }) => (
    <div
      role="alert"
      className="mb-4 rounded bg-red-100 border border-red-400 px-4 py-3 text-red-700"
      aria-live="assertive"
    >
      {message}
    </div>
  );