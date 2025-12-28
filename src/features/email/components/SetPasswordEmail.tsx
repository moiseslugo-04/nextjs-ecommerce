import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
} from '@react-email/components'

export function SetPasswordEmail({ resetUrl }: { resetUrl: string }) {
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
            Set Password
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '12px' }}>Hello,</Text>

          <Text style={{ fontSize: '16px', marginBottom: '12px' }}>
            We received a request to set the password for your account.
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '24px' }}>
            Click the button below to set a password:
          </Text>

          <Link
            href={resetUrl}
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
            Set Password
          </Link>

          <Text style={{ fontSize: '14px', marginTop: '16px', color: '#555' }}>
            If you didn’t request a set password, you can safely ignore this
            email.
          </Text>

          <Text style={{ fontSize: '14px', marginTop: '24px' }}>
            — The Gechis Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
