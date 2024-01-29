// src/App.tsx
import { useState } from "react";
import ColorInput from "./ColorInput";
import ScoreDisplay from "./ScoreDisplay";

function App() {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#ffffff");

  const calculateWCAGScore = (color1: string, color2: string) => {
    // convert colors to RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) {
      // catch null values
      return 0;
    }

    // calculate relative luminance for the two colors then compare
    const L1 = getRelativeLuminance(rgb1);
    const L2 = getRelativeLuminance(rgb2);

    const contrastRatio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

    return contrastRatio;
  };

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function getRelativeLuminance(rgb: { r: number; g: number; b: number }) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
    g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
    b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  const score = calculateWCAGScore(color1, color2);

  return (
    <div className="flex w-full items-center justify-center align-middle h-full">
      <div className="grid lg:w-1/2 grid-cols-4 grid-rows-5 gap-3 [&>*]:border-2 [&>*]:border-neutral-950 h-full p-12 [&>*]:rounded-lg">
        <div className="col-span-1 row-span-1">
          <ColorInput label="Color 1" value={color1} onChange={setColor1} />
        </div>
        <div className="col-span-1 row-span-1">
          <ColorInput label="Color 2" value={color2} onChange={setColor2} />
        </div>
        <div className="col-span-2 row-span-1">
          <ScoreDisplay score={score} />
        </div>
        <div className="col-span-2 row-span-1">
        Normal - 4.5:1
        </div>
        <div className="col-span-2 row-span-2">
        LARGE - 3:1
        </div>
        <div className="col-span-2 row-span-1">
        AAA - 7:1
        </div>
        <div className="col-span-4 row-span-2">
        AAA - 4.5:1
        </div>
        
      </div>
    </div>
  );
}

export default App;
