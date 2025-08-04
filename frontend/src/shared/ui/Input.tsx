interface InputProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  disabled = false,
}: InputProps) => (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          border rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          transition-colors duration-150
          disabled:bg-gray-100
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="text-red-600 text-sm" role="alert">
          {error}
        </span>
      )}
    </div>
  );
  