import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function Cancel() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="my-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Donation Cancelled</CardTitle>
          <CardDescription>
            It looks like your donation wasn’t completed. 💔
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700">
            If this was a mistake or you changed your mind, you can try donating
            again anytime.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-1 text-sm text-gray-500">
          <span>&copy; {currentDate} Donator. All rights reserved.</span>
          <span className="font-semibold">We hope to see you back soon!</span>
        </CardFooter>
      </Card>
    </div>
  );
}
