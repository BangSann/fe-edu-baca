import TextError from "../../../components/textError";

const InputField = ({
  name,
  placeholder,
  type,
  label,
  onchange,
  values,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="nama">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-md w-full ${error ? "outline outline-red-500" : ""}`}
        value={values}
        onChange={onchange}
      />
      {error ? <TextError>{error}</TextError> : ""}
    </div>
  );
};

export default InputField