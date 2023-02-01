import { FC, Suspense } from "react";
import { GenerationSelect } from "./GenerationSelect";
import { PokemonList } from "./PokemonList";

export const RecoilApp: FC = () => {
  return (
    <div>
      <p>
        <GenerationSelect />
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        <PokemonList />
      </Suspense>
    </div>
  );
};
