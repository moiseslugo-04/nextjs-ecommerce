import CallAction from '@components/about/CallAction'
import Mission from '@components/about/Mission'
export default function AboutPage() {
  return (
    <section className='grow flex flex-col  '>
      <Mission />
      {/* Call to Action */}
      <CallAction />
    </section>
  )
}
