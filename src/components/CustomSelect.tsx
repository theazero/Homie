import { useEffect, useRef, useState } from "react";

type SelectOption<TValue extends string> = {
  value: TValue;
  label: string;
};

type CustomSelectProps<TValue extends string> = {
  id: string;
  value: TValue;
  options: SelectOption<TValue>[];
  onChange: (value: TValue) => void;
};

export function CustomSelect<TValue extends string>({
  id,
  value,
  options,
  onChange,
}: CustomSelectProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", closeOnOutsideClick);

    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <>
      <select
        id={id}
        className="native-select"
        tabIndex={-1}
        aria-hidden="true"
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div ref={selectRef} className={`custom-select${isOpen ? " is-open" : ""}`}>
        <button type="button" className="custom-select-trigger" onClick={() => setIsOpen((open) => !open)}>
          {selectedOption.label}
        </button>
        <ul className="custom-select-options">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`custom-select-option${option.value === value ? " is-selected" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
