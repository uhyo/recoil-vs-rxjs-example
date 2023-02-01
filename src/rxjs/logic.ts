import type { SignalKind } from "wonka";
import { Client, gql } from "@urql/core";
import { BehaviorSubject, map, mergeMap, Observable, share } from "rxjs";

export const generationSubject = new BehaviorSubject(1);

export const pokemonList = generationSubject.pipe(
  mergeMap((generation) => requestPokemonList(generation)),
  share()
);

const client = new Client({
  url: "https://beta.pokeapi.co/graphql/v1beta",
});

type Pokemon = {
  id: number;
  name: string;
};

const pokemonListQuery = gql`
  query ($generation: Int!) {
    species: pokemon_v2_pokemonspecies(
      where: { generation_id: { _eq: $generation } }
      order_by: { id: asc }
    ) {
      id
      pokemon_v2_pokemonspeciesnames(where: { language_id: { _in: [11] } }) {
        language_id
        name
      }
    }
  }
`;

function requestPokemonList(
  generation: number
): Observable<readonly Pokemon[]> {
  return new Observable<any>((subscriber) => {
    const source = client.query(pokemonListQuery, {
      generation,
    });
    source((signal) => {
      if (signal === 0 /*SignalKind.End */) {
        subscriber.complete();
        return;
      }
      if (signal.tag === (1 as SignalKind.Push)) {
        if (signal[0].error) {
          subscriber.error(signal[0].error);
        }
        subscriber.next(signal[0].data);
      }
    });
  }).pipe(
    map((data): readonly Pokemon[] => {
      return data.species.map((s: any) => ({
        id: s.id,
        name: s.pokemon_v2_pokemonspeciesnames[0].name,
      }));
    })
  );
}
