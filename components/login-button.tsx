'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner, IconGoogle } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  showGoogleIcon?: boolean
  text?: string
}

export function LoginButton({
  showGithubIcon = true,
  showGoogleIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setIsLoading(true)
          // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
          signIn('github', { callbackUrl: `/` })
        }}
        disabled={isLoading}
        className={cn('m-2', className)}
        {...props}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 animate-spin" />
        ) : showGithubIcon ? (
          <IconGitHub className="mr-2" />
        ) : null}
        {'Login with GitHub'}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setIsLoading(true)
          // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
          signIn('google', { callbackUrl: `/` })
        }}
        disabled={isLoading}
        className={cn('m-2', className)}
        {...props}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 animate-spin" />
        ) : showGoogleIcon ? (
          <IconGoogle className="mr-2" />
        ) : null}
        {'Login with Google'}
      </Button>
    </>
  )
}
