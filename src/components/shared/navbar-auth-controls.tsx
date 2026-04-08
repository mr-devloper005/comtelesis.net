'use client'

import Link from 'next/link'
import { LogOut, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <Button size="sm" asChild className="hidden h-10 gap-1 rounded-full bg-[#4A70A9] px-4 font-semibold text-white shadow-[0_8px_24px_rgba(74,112,169,0.3)] hover:bg-[#3d5f8f] sm:flex">
        <Link href="/create/article">
            <Plus className="h-4 w-4" />
            Create
        </Link>
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-black hover:bg-[#8FABD4]/25" aria-label="Open account details">
            <User className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm border-slate-200 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>Login Details</DialogTitle>
          </DialogHeader>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <Avatar className="h-10 w-10 border border-slate-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.name || 'User'}</p>
              <p className="truncate text-xs text-slate-600">{user?.email || 'No email available'}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
