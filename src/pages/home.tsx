import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import Pagination from '@/components/home/pagination';
import PokemonCard from '@/components/home/pokemon-card';
import { Search } from '@/components/home/search';
import { AppStateObject, Pokemon } from '@/models/types';

import api from '@/lib/client';
import PokemonSkeleton from '@/components/home/pokemon-skeleton';
import { useEffect, useState } from 'react';
import { TypeSelect } from '@/components/home/type-select';
import { AbilitySelect } from '@/components/home/ability-select';

type PokemonListResponse = {
  results: { url: string; name: string }[];
  [key: string]: any;
};

type FetchPokemonListResponse = Pokemon[];

const fetchPokemonList = async (
  offset: number,
  typeFilter: string,
  abilityFilter: string
): Promise<FetchPokemonListResponse> => {
  const pokemonUrl = typeFilter || abilityFilter || `pokemon?limit=20&offset=${offset}`;
  const response = await api.get<PokemonListResponse>(pokemonUrl);
  const pokemonRes = typeFilter || abilityFilter ? response.data.pokemon : response.data.results;
  const pokemonDetailsPromises =
    typeFilter || abilityFilter
      ? pokemonRes.map((p: any) => api.get<Pokemon>(p.pokemon.url))
      : pokemonRes.map((p: Pokemon) => api.get<Pokemon>(p.url));
  const pokemonDetails = await Promise.all(pokemonDetailsPromises);
  return pokemonDetails.map(pokemon => pokemon.data);
};

export default function HomePage() {
  const { currentPage, offset } = useSelector((state: AppStateObject) => state.pagination);
  const { searchTerm, typeFilter, abilityFilter } = useSelector(
    (state: AppStateObject) => state.filter
  );
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);

  const {
    data: pokemonList = [],
    isLoading,
    isError,
  } = useQuery<FetchPokemonListResponse, Error>(
    ['pokemonList', currentPage, typeFilter, abilityFilter],
    () => fetchPokemonList(offset, typeFilter, abilityFilter),
    {
      onSuccess: data => {
        setFilteredPokemonList(data);
      },
    }
  );

  function searchPokemonList(query: string): Pokemon[] {
    return pokemonList.filter(pokemon => {
      return (
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.types.some(type => type.type.name.toLowerCase().includes(query.toLowerCase()))
      );
    });
  }

  useEffect(() => {
    if (searchTerm) {
      const matchingPokemon = searchPokemonList(searchTerm);
      setFilteredPokemonList(matchingPokemon);
    } else {
      setFilteredPokemonList(pokemonList);
    }
  }, [searchTerm]);

  if (isError) {
    return <div>Error </div>;
  }

  const loadingMarkup = Array.from({ length: 4 }).map((_, index) => (
    <PokemonSkeleton key={index} />
  ));

  const pokemonMarkup =
    Array.isArray(filteredPokemonList) && filteredPokemonList.length > 0 ? (
      filteredPokemonList.map((pokemon: any) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))
    ) : (
      <div className="text-center text-black text-4xl">Not found</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokedex</h1>
      <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
        <Pagination />
        <Search />
        <TypeSelect />
        <AbilitySelect />
        <div className="grid grid-cols-4 gap-4">{isLoading ? loadingMarkup : pokemonMarkup}</div>
      </div>
    </div>
  );
}
