import InvalidTokenCard from '@/components/InvalidTokenCard'
export default function ResendPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>
}) {
  return <InvalidTokenCard />
}
