import { Button } from '@components/ui/button'
interface GoogleButtonProps {
  onClick: () => void
  isLoading: boolean
}
export function GoogleButton({ onClick, isLoading }: GoogleButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant='outline'
      disabled={isLoading}
      className='w-full py-6 flex items-center justify-center gap-3'
    >
      <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
        <path
          d='M22.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.3h5.8c-.3 1.6-1.3 3-2.8 3.9v3.2h4.5c2.6-2.4 4-5.9 4-9.1z'
          fill='#4285F4'
        />
        <path
          d='M12 23c3.3 0 6-1.1 8-3l-4.5-3.2c-1.1.7-2.5 1.1-3.9 1.1C8.1 17.9 5.3 16 4.3 13H-.3v3.3C1.8 20.5 6.5 23 12 23z'
          fill='#34A853'
        />
        <path
          d='M4.3 13c-.3-.7-.5-1.4-.5-2.2s.2-1.5.5-2.2V5.3H-.3C-1 6.7-1.3 8.3-1.3 10c0 1.7.3 3.3 1 4.7L4.3 13z'
          fill='#FBBC05'
        />
        <path
          d='M12 4.1c1.8 0 3.4.6 4.6 1.7l3.4-3.4C18 1.1 15.3 0 12 0 6.5 0 1.8 2.5-.3 6.7L4.3 10c1-2.9 3.8-5 7.7-5.9z'
          fill='#EA4335'
        />
      </svg>
      {isLoading ? ' Loading....' : ' Continue with Google'}
    </Button>
  )
}
