 
interface inputProps {
  label: string;
  id: string;
  name: string;
  type: 'input' | 'textarea';
  inputType?: 'text' | 'email' | 'search' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  [key: string]: any;
}



export default function Input({
  label,
  id,
  name,
  type = 'input',
  inputType = 'text',
  placeholder,
  required = false,
  rows,
  register,
  ...rest
}: inputProps) {
  const commonClass =
    'rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2';
  const renderInput = (type: string) => {
    switch (type) {
      case 'input':
        return (
          <input
            {...register}
            type={inputType}
            id={id}
            name={name}
            required={required}
            placeholder={placeholder}
            className={`${commonClass}`}
          />
        );
      case 'textarea':
        return (
          <textarea
            {...register}
            id={id}
            name={name}
            required={required}
            placeholder={placeholder}
            className={`${commonClass}`}
            rows={rows}
          ></textarea>
        );
      default:
        return (
          <input
            {...register}
            type={inputType}
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            className={`${commonClass}`}
          />
        );
    }
  };

  return (
    <div className="w-full mb-2">
      <label htmlFor={name} className="font-semibold text-sm mb-3">
        {label}
      </label>
      {renderInput(type)}
    </div>
  );
}
