import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

interface Board {
  id: string;
  name: string;
}

export default function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleCreateBoard = () => {
    const name = prompt('게시판 이름을 입력하세요');
    if (name && name.trim()) {
      const newBoard: Board = {
        id: crypto.randomUUID(),
        name: name.trim(),
      };
      setBoards([...boards, newBoard]);
      setSelectedBoardId(newBoard.id);
    }
  };

  const handleSelectBoard = (id: string) => {
    setSelectedBoardId(id);
  };

  const selectedBoard = boards.find(b => b.id === selectedBoardId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar email={user?.email || ''} />
      <div className="flex flex-1">
        <Sidebar
          boards={boards}
          selectedBoardId={selectedBoardId}
          onSelectBoard={handleSelectBoard}
          onCreateBoard={handleCreateBoard}
        />
        <main className="flex-1 p-6">
          {selectedBoard ? (
            <div>
              <h1 className="text-2xl font-semibold mb-4">{selectedBoard.name}</h1>
              <p className="text-muted-foreground">게시글이 여기에 표시됩니다.</p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              게시판을 선택하거나 새로 만들어주세요
            </div>
          )}
        </main>
      </div>
    </div>
  );
}