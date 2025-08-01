import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, logOut, isFirebaseConfigured } from '@/lib/firebase';
import { signInAsDemo, signOutDemo } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export const AuthButton: React.FC = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!isFirebaseConfigured) {
      toast({
        title: "Authentication not configured",
        description: "Firebase authentication is not set up. Contact your administrator.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signInWithGoogle();
      toast({
        title: "Signed in successfully",
        description: "Welcome to ContentHub!",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      // Check if this is a demo user
      if (user?.email?.includes('@example.com')) {
        signOutDemo();
        return;
      }
      
      await logOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="w-20 h-10 bg-muted animate-pulse rounded-md" />;
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button onClick={handleSignIn} variant="outline" disabled={!isFirebaseConfigured}>
          {isFirebaseConfigured ? "Sign In" : "Auth Disabled"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Demo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signInAsDemo('admin')}>
              Demo Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signInAsDemo('user')}>
              Demo User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
            <AvatarFallback>
              {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};