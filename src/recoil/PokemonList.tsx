import { FC } from "react";
import { useRecoilValue } from "recoil";
import { pokemonListState } from "./logic";

export const PokemonList: FC = () => {
  const pokemonList = useRecoilValue(pokemonListState);

  return (
    <ul className="pokemon-list">
      {pokemonList.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
};
