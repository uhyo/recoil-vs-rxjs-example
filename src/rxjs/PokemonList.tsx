import { FC } from "react";
import { useObservable } from "./bridge";
import { pokemonList } from "./logic";

export const PokemonList: FC = () => {
  const list = useObservable(pokemonList);

  if (list === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="pokemon-list">
      {list.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
};
