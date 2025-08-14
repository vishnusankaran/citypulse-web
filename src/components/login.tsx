import * as React from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Fingerprint, Github } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/user';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Navigate to GitHub authorization endpoint
    window.location.href = `${
      import.meta.env.VITE_PUBLIC_API_ENDPOINT
    }/github/authorize`;
  }

  const handleBiometricLogin = async () => {
    try {
      // Note: In a real application, the challenge would be fetched from the server
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          timeout: 60000,
          userVerification: 'preferred',
          rpId: window.location.hostname,
        },
      });

      // In a real application, the credential would be sent to the server for verification
      console.log('Biometric login successful:', credential);
      // You would typically navigate to the dashboard or set user as authenticated here
    } catch (error) {
      console.error('Biometric login failed:', error);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-bold">
          <span className="text-2xl font-bold tracking-tight">CityPulse</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has completely transformed how we handle our
              business operations."
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Continue with your GitHub account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Continue with GitHub
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-muted-foreground mb-16 mt-12">
              Or sign in with
            </p>
            <Fingerprint size={'64'} onClick={handleBiometricLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
