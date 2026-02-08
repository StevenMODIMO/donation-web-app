import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function Success() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="my-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription>Your donation has been received! ❤️</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700">
            Your generosity helps us make a difference. We truly appreciate your
            support.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-1 text-sm text-gray-500">
          <span>&copy; {currentDate}. All rights reserved.</span>
          <span className="font-semibold">You made an impact today!</span>
        </CardFooter>
      </Card>
    </div>
  );
}
