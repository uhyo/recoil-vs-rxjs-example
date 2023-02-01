import { FC } from "react";
import { useObservable } from "./bridge";
import { generationSubject } from "./logic";

export const GenerationSelect: FC = () => {
  const generation = useObservable(generationSubject);

  return (
    <select
      value={String(generation)}
      onChange={(e) => {
        generationSubject.next(Number(e.target.value));
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
