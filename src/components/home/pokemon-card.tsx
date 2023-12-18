import { CardContent, Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { AppStateObject, Pokemon } from '@/models/types';
import { useSelector } from 'react-redux';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, searchTerm }) => {
  return (
    <>
      {text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const avatarImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const { searchTerm } = useSelector((state: AppStateObject) => state.filter);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border border-gray-300 p-4 m-4 text-center bg-gray-300 rounded-lg shadow-md transition duration-200 ${
        isHovered ? 'transform scale-105 border-red-500' : ''
      }`}
    >
      <CardContent>
        {!isHovered && (
          <div>
            <img alt="Pokemon Image" src={avatarImageUrl} width={200} height={200} />
            <h2 className="text-lg font-bold">
              <HighlightedText text={pokemon.name} searchTerm={searchTerm} />
            </h2>
            <p className="text-gray-500 dark:text-gray-400">ID: {pokemon.id}</p>
            {pokemon.types.map((typeObj, index) => (
              <Badge key={index}>
                <HighlightedText text={typeObj.type.name} searchTerm={searchTerm} />
              </Badge>
            ))}
          </div>
        )}
        {isHovered && (
          <div>
            <h2 className="text-lg font-bold">{pokemon.name}</h2>
            {pokemon.stats.map((stat, index) => (
              <p key={index} className="text-white text-lg font-bold mt-2">
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
            {pokemon.types.map((typeObj, index) => (
              <Badge key={index}>
                <HighlightedText text={typeObj.type.name} searchTerm={searchTerm} />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
