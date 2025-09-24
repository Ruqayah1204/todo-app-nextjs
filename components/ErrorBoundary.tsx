import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorProps {
  message: string;
}

interface ErrorFallbackProps {
  error: ErrorProps;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <main role="main" aria-labelledby="error-page-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter">
          <CardContent className="flex flex-col justify-center text-center gap-4 p-6">
            <h1
              className="text-4xl font-bold text-center text-blue-600 border-b pb-4"
              id="error-page-heading"
            >
              Ooops!
            </h1>
            <p className="text-3xl font-medium">Something went wrong:</p>
            <p className="text-2xl text-destructive font-medium">{error.message}</p>
            
            <Button
              className="self-center"
              onClick={() => (window.location.href = "/")}
            >
              Go Back to Home
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default ErrorFallback;
