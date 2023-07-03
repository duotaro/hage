import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  // コメント取得
  const id = nanoid()


  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <Chat id={id} />
    </div>
  )
}
