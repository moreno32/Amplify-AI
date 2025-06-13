'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ChevronsRight,
} from 'lucide-react';
import Link from 'next/link';

function LoginPanel() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

function PromisePanel() {
  return (
    <div className="hidden bg-muted lg:block">
      <div className="flex flex-col justify-between h-full p-8 text-white bg-gradient-to-br from-[#6444F4] to-[#4B38D8]">
        <div className="flex items-center gap-2 font-semibold">
          <ChevronsRight className="h-6 w-6" />
          <span>Amplify AI</span>
        </div>
        <div className="mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This tool has saved me countless hours of work and helped
              me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <LoginPanel />
      <PromisePanel />
    </div>
  );
} 