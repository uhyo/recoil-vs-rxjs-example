import { FC } from "react";
import { GenerationSelect } from "./GenerationSelect";
import { PokemonList } from "./PokemonList";

export const RxJsApp: FC = () => {
  return (
    <div>
      <p>
        <GenerationSelect />
      </p>
      <PokemonList />
    </div>
  );
};
