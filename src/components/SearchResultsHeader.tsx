import { Search, Frown } from 'lucide-react'

interface SearchResultsHeaderProps {
  searchTerm: string
  resultsCount: number
  entityName?: string
  noResultsMessage?: string
  suggestions?: string[]
}

export function SearchResultsHeader({
  searchTerm,
  resultsCount,
  entityName = 'result',
  noResultsMessage,
  suggestions = [],
}: SearchResultsHeaderProps) {
  const hasResults = resultsCount > 0
  const entityDisplayName = resultsCount === 1 ? entityName : `${entityName}s`
  console.log(hasResults)
  return (
    <header className='my-10 text-center'>
      {hasResults ? (
        <>
          <div className='inline-flex items-center justify-center gap-2 bg-gechis-blue/10 text-gechis-blue rounded-full px-4 py-2 mb-3'>
            <Search className='w-5 h-5' />
            <span className='font-medium'>Search results for:</span>
            <span className='font-semibold text-gechis-blue'>
              “{searchTerm}”
            </span>
          </div>
          <h1 className='text-4xl font-bold tracking-tight mb-2'>
            Found {resultsCount} {entityDisplayName}
          </h1>
        </>
      ) : (
        <div className='mt-10'>
          <div className='inline-flex items-center justify-center gap-2 bg-amber-500/10 text-amber-600 rounded-full px-4 py-2 mb-3'>
            <Frown className='w-5 h-5' />
            <span className='font-medium'>No results found for:</span>
            <span className='font-semibold text-amber-600'>“{searchTerm}”</span>
          </div>

          <h1 className='text-4xl font-bold tracking-tight mb-6 text-gray-600'>
            {noResultsMessage || `No ${entityDisplayName} found`}
          </h1>

          {/* SUGGESTIONS (optional) */}
          {suggestions.length > 0 && (
            <div className='bg-gray-50 rounded-lg p-6 max-w-md mx-auto'>
              <p className='font-medium text-gray-700 mb-3'>
                Try these suggestions:
              </p>
              <ul className='text-sm text-gray-600 space-y-1'>
                {suggestions.map((suggestion, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
