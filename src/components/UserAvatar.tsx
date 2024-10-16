import React from "react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="w-8 h-8 relative rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
            width={32} // Set the width for the profile image
            height={32} // Set the height for the profile image
            className="object-cover"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
