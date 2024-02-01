// src/App.tsx
import { IconRefresh, IconBrandGithub } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import ColorInput from "./ColorInput";
import ScoreDisplay from "./ScoreDisplay";

function App() {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#ffffff");
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const swapColors = () => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  };

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-fit w-full flex-row items-center justify-center align-middle font-josefin font-bold md:text-4xl lg:w-3/5">
        <div className="m-8 flex w-full justify-between md:mt-3 lg:m-0 lg:mt-8">
          <h1 className="text-3xl lg:text-5xl">
            Color Matcher by Joaquin Arruiz
          </h1>
          <a
            href="https://github.com/JoaquinArruiz/"
            className="flex items-center transition-all ease-in-out hover:scale-105"
            target="_blank"
          >
            <IconBrandGithub size={32} />
          </a>
        </div>
      </div>{" "}
      <div className="flex h-fit w-full items-center justify-center align-middle font-josefin font-bold">
        <div className="m-8 grid h-full grid-cols-4 grid-rows-5 gap-3 lg:w-3/5 [&>*]:rounded-lg [&>*]:border-2 [&>*]:border-neutral-950">
          <div className="col-span-1 row-span-1 max-h-32">
            <ColorInput label="Color 1" value={color1} onChange={setColor1} />
          </div>
          <div className="col-span-1 row-span-1 max-h-32">
            <ColorInput label="Color 2" value={color2} onChange={setColor2} />
          </div>
          <div className="col-span-2 row-span-1 flex max-h-32 flex-col items-center justify-between p-3 align-middle md:flex-row">
            <ScoreDisplay score={score} />
            <button
              onClick={swapColors}
              className="transition-all ease-in-out hover:scale-110 active:scale-95"
            >
              <IconRefresh size={32} />
            </button>
          </div>
          <div className="col-span-2 row-span-1 flex h-full items-center">
            {matches ? (
              <div className="ml-2">
                <div className="">
                  <p>
                    AA NORMAL 4.5:1
                    {score >= 4.5 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                  <p>
                    AA LARGE 3:1
                    {score >= 3 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                </div>
                <div className="">
                  <p>
                    AAA NORMAL 7:1
                    {score >= 7 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                  <p>
                    AAA LARGE 4.5:1
                    {score >= 4.5 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="ml-2">
                <div className="">
                  <p>
                    AA N 4.5:1
                    {score >= 4.5 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                  <p>
                    AA L 3:1
                    {score >= 3 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                </div>
                <div className="">
                  <p>
                    AAA N 7:1
                    {score >= 7 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                  <p>
                    AAA L 4.5:1
                    {score >= 4.5 ? (
                      <span className="text-green-500"> ✔</span>
                    ) : (
                      <span className="text-red-500"> ✘</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className="col-span-2 row-span-2 max-h-64 p-4 transition-all ease-in-out md:[&>*]:m-2"
            style={{ color: color1, backgroundColor: color2 }}
          >
            <h1 className="text-lg md:text-3xl">Color Contrast Tool!</h1>
            <hr style={{ borderColor: color1 }} className="my-2" />
            <p className="text-small font-normal md:text-xl">
              Optimize your design's accessibility
              {matches && " by checking the contrast ratio between two colors."}
            </p>
          </div>
          <div className="col-span-2 row-span-1 flex flex-col items-center space-y-4 p-3 text-sm transition-all ease-in-out md:flex-row md:items-center md:space-x-4 md:space-y-0 md:p-4 ">
            <button
              className="h-10 w-full rounded-full border-2 border-neutral-900 transition-all ease-in-out hover:scale-105 hover:opacity-90 active:scale-100 md:w-1/2"
              style={{ color: color1, backgroundColor: color2 }}
            >
              Press here!
            </button>
            <button
              className="h-10 w-full border-2 border-neutral-900 transition-all ease-in-out hover:scale-105 hover:opacity-90 active:scale-100 md:w-1/2"
              style={{ color: color1, backgroundColor: color2 }}
            >
              Press here!
            </button>
          </div>
          <div
            className="col-span-4 row-span-2 flex h-fit flex-col justify-center p-2 md:col-span-3 md:row-span-2 md:flex-row md:items-center md:justify-between md:p-4"
            style={{ color: color1, backgroundColor: color2 }}
          >
            <img
              src="https://images.pexels.com/photos/4219113/pexels-photo-4219113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Article Image"
              className="mb-4 h-32 rounded-lg border-2 object-none md:h-60"
              style={{ borderColor: color1 }}
            />
            <div className="ml-2 h-full w-full flex-col justify-between">
              <h1 className="mb-2 text-2xl font-bold">Article Title</h1>
              <p className="line-clamp-3 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, tortor ut tincidunt aliquam, mauris nunc tincidunt
                dolor, vitae ultricies nunc nunc id nisl. Fusce nec nunc id
                nisl. Fusce nec nunc id nisl. Fusce nec nunc id nisl.
              </p>
            </div>
          </div>
          <div
            className="hidden p-2 md:col-span-1 md:row-span-2 md:block"
            style={{ color: color1, backgroundColor: color2 }}
          >
            <img
              src="https://images.pexels.com/photos/4219113/pexels-photo-4219113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Article Image"
              className="mb-4 h-32 w-full rounded-lg border-2 object-none"
              style={{ borderColor: color1 }}
            />
            <div>
              <h1 className="mb-2 text-2xl font-bold">Article Title</h1>
              <p className="line-clamp-3 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, tortor ut tincidunt aliquam, mauris nunc tincidunt
                dolor, vitae ultricies nunc nunc id nisl. Fusce nec nunc id
                nisl. Fusce nec nunc id nisl. Fusce nec nunc id nisl.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
