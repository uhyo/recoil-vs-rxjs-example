import { FC } from "react";
import { useRecoilState } from "recoil";
import { generationState } from "./logic";

export const GenerationSelect: FC = () => {
  const [generation, setGeneration] = useRecoilState(generationState);

  return (
    <select
      value={String(generation)}
      onChange={(e) => {
        setGeneration(Number(e.target.value));
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
        <option key={g} value={String(g)}>
          第{g}世代
        </option>
      ))}
    </select>
  );
};
