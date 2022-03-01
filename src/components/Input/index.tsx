import './index.scss';
import { InputProps } from '../../Type';
import { useState } from 'react';
export default function Input({
  label,
  placeholder,
  name,
  postfix,
  register = null,
  required = false,
  onChange,
  type,
  value,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  function onChangeHandler(event) {
    const value = event.target.value;
    setInputValue(value);
    if (onChange) onChange(value);
  }
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...(register && register(name, { required: required }))}
        value={inputValue}
        onChange={onChangeHandler}
      />
      {postfix && <span className="postfix">{postfix}</span>}
    </div>
  );
}
