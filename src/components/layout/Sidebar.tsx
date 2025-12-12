import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Board {
  id: string;
  name: string;
}

interface SidebarProps {
  boards: Board[];
  selectedBoardId: string | null;
  onSelectBoard: (id: string) => void;
  onCreateBoard: () => void;
}

export default function Sidebar({ boards, selectedBoardId, onSelectBoard, onCreateBoard }: SidebarProps) {
  return (
    <aside className="w-60 border-r bg-muted/30 flex flex-col">
      <div className="p-4">
        <Button onClick={onCreateBoard} variant="outline" className="w-full">
          + 새 게시판
        </Button>
      </div>
      <Separator />
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {boards.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            게시판이 없습니다
          </p>
        ) : (
          boards.map((board) => (
            <button
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${selectedBoardId === board.id 
                  ? 'bg-accent text-accent-foreground' 
                  : 'hover:bg-accent/50'
                }`}
            >
              {board.name}
            </button>
          ))
        )}
      </nav>
    </aside>
  );
}