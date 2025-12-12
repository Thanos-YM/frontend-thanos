import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  email: string;
}

export default function Navbar({ email }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">MyBoard</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitial(email)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-muted-foreground text-sm">
            {email}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}