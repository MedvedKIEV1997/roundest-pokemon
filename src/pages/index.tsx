import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { PokemonOutput, trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

const btn =
    'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const Home: NextPage = () => {
    const [pokemons, setPokemons] = useState<number[]>([]);
    const firstPokemon = trpc.getPokemonById.useQuery({ id: pokemons[0] });
    const secondPokemon = trpc.getPokemonById.useQuery({ id: pokemons[1] });

    useEffect(() => {
        setPokemons(getOptionsForVote());
    }, []);

    const voteForRoundest = (selected: number) => {
        setPokemons(getOptionsForVote());
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Which Pokemon is Rounder</div>
            <div className="p-2" />
            <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
                {!firstPokemon.isLoading &&
                    !secondPokemon.isLoading &&
                    firstPokemon.data &&
                    secondPokemon.data && (
                        <>
                            <PokemonListing
                                pokemon={firstPokemon.data}
                                vote={() => voteForRoundest(pokemons[0])}
                            />
                            <div className="p-8 text-2xl">Vs</div>

                            <PokemonListing
                                pokemon={secondPokemon.data}
                                vote={() => voteForRoundest(pokemons[1])}
                            />
                        </>
                    )}
            </div>
        </div>
    );
};

export default Home;

const PokemonListing: FC<{ pokemon: PokemonOutput; vote: () => void }> = (
    props
) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64 flex flex-col place-content-center ">
                <img
                    src={props.pokemon.imageUrl || ''}
                    className="max-w-full max-h-full"
                />
            </div>
            <div className="p-3" />

            <div className="text-center text-xl capitalize">
                {props.pokemon.name}
            </div>
            <div className="p-3" />
            <button className={btn} onClick={props.vote}>
                Rounder
            </button>
        </div>
    );
};
