// src/components/ColorInput.tsx
import React from "react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex h-full flex-col p-1 md:p-3">
      <label className="text-sm md:text-xl">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full"
      />
    </div>
  );
};

export default ColorInput;
