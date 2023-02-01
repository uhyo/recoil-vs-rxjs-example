import { Client, gql } from "@urql/core";
import { atom, selector } from "recoil";

export const generationState = atom({
  key: "generation",
  default: 1,
});

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

export const pokemonListState = selector<readonly Pokemon[]>({
  key: "pokemonList",
  async get({ get }) {
    const generation = get(generationState);

    const response = await client
      .query(pokemonListQuery, {
        generation,
      })
      .toPromise();
    if (response.error) {
      throw response.error;
    }
    if (!response.data) {
      throw new Error("No Data");
    }
    return response.data.species.map((s: any) => ({
      id: s.id,
      name: s.pokemon_v2_pokemonspeciesnames[0].name,
    }));
  },
});
