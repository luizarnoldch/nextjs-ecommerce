"use client"
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const DashboardPage = (props: Props) => {
  const router = useRouter()
  return (
    <div>
      DashboardPage
      <div >
        <button className='p-4 bg-amber-700 rounded-4xl' onClick={async () => {
          await signOut(
            {
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in")
                }
              }
            }
          )
        }}>
          LogOut
        </button>
      </div>
    </div>
  )
}

export default DashboardPage