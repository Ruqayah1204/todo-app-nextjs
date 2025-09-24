import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main role="main" aria-labelledby="not-found-page-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter">
          <CardContent className="flex flex-col justify-center text-center gap-4 p-6">
            <h1
              className="text-4xl font-bold text-center text-blue-600 border-b pb-4"
              id="not-found-page-heading"
            >
              Ooops!
            </h1>
            <p className="text-3xl font-medium">Error 404</p>
            <p className="text-2xl font-medium">Page you are looking for is not found</p>
            <Button asChild className="self-center">
              <Link href="/">
                <ArrowLeft className="mr-2" />
                Go Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
