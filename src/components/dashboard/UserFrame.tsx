import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const UserFrame = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <Skeleton className="h-12 w-12 rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>

          {user && user ? (
            <div className="flex flex-col">
              <span className="flex items-center gap-1">
                <h1 className="text-md font-semibold">{user?.username}</h1>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </span>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserFrame;
