import React from 'react';

interface CheckboxExampleProps {
  value: string;
  setPlayerLetter:Function
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckboxExample: React.FC<CheckboxExampleProps> = ({ value, isChecked, setIsChecked,setPlayerLetter }) => {
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if(event.target.checked){
        console.log(value)
        setPlayerLetter(value)
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <label htmlFor="checkbox" className="flex items-center space-x-3">
        <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-gray-700">{value}</span>
      </label>
      <div className="mt-4 text-gray-600">
        Checkbox is <span className="font-semibold">{isChecked ? 'checked' : 'unchecked'}</span>
      </div>
    </div>
  );
};

export default CheckboxExample;
