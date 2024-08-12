import { getProviders, signIn } from 'next-auth/react';
import { Box, Button, Typography } from '@mui/material';

export default function SignIn({ providers }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Sign in to your account
      </Typography>
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.name}
          variant="contained"
          onClick={() => signIn(provider.id)}
          sx={{ mt: 2 }}
        >
          Sign in with {provider.name}
        </Button>
      ))}
    </Box>
  );
}

// This function fetches the available providers (e.g., Google, GitHub)
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
