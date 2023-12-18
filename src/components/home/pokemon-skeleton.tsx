import { CardContent, Card } from '@/components/ui/card';

export default function PokemonSkeleton() {
  return (
    <Card className="border border-gray-300 p-4 m-4 text-center bg-gray-300 rounded-lg shadow-md transition duration-200">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 w-32 rounded"></div>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-24 rounded" />
        </p>
        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-12 rounded"></div>
      </CardContent>{' '}
    </Card>
  );
}
