import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
} from '@react-email/components'

export function VerifyEmail({ verifyUrl }: { verifyUrl: string }) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: '#f6f6f6',
          padding: '24px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Text
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            Confirm your account
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '12px' }}>Hello,</Text>

          <Text style={{ fontSize: '16px', marginBottom: '12px' }}>
            Thanks for signing up. Please confirm your email address to activate
            your account.
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '24px' }}>
            Click the button below to verify your email:
          </Text>

          <Link
            href={verifyUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: 'bold',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Verify Email
          </Link>

          <Text style={{ fontSize: '14px', marginTop: '16px', color: '#555' }}>
            If you didn’t request this email, you can safely ignore it.
          </Text>

          <Text style={{ fontSize: '14px', marginTop: '24px' }}>
            — The Gechis Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
