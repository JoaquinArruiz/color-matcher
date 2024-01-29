// src/components/ColorInput.tsx
import React from "react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col h-full p-3">
      <label className="md:text-xl">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full"
      />
    </div>
  );
};

export default ColorInput;
