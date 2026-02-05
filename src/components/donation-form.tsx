"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DonationForm() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-lg">Donor Info</CardTitle>
          <CardDescription>Tell us a little about you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3">
            <Label htmlFor="name">Full name</Label>
            <Input placeholder="John Doe" id="name" />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="johndoe26@example.com"
            />
            <Label htmlFor="number">Phone number</Label>
            <Input
              id="number"
              type="number"
              min={0}
              max={15}
              placeholder="+25-657-594-790"
              className="appearance-none"
            />
            <Label>Message to the cause (Optional)</Label>
            <Textarea placeholder="I hope this small token of mine helps create a greater impact." />
            <Button>Continue</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
