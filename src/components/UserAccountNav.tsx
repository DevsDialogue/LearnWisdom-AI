'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from './ui/button'

type Props = {}

const UserAccountNav = (props: Props) => {
  return (
   <DropdownMenu>
    <DropdownMenuTrigger>
        <Button>Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
        <div>
            
        </div>

    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default UserAccountNav