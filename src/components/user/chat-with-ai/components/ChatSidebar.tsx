'use client';

import { Plus, MessageSquare, ChevronRight, BookOpen } from 'lucide-react';
import { 
  Button, 
  Card, 
  ScrollArea, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui';

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  chatSessions: ChatSession[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onClose?: () => void; // Optional prop for mobile view
}

export default function ChatSidebar({ chatSessions, onNewChat, onSelectChat, onClose }: ChatSidebarProps) {
  return (
    <div className="flex flex-col w-full md:w-64">
      <div className="mb-4 flex items-center justify-between">
        <Button 
          className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          onClick={onNewChat}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
        
        {/* Only show close button on mobile when onClose prop is provided */}
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="ml-2 lg:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-0">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="space-y-2 pr-3">
              {chatSessions.map((session) => (
                <Card 
                  key={session.id}
                  className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between group"
                  onClick={() => onSelectChat(session.id)}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-700 truncate">{session.title}</p>
                      <p className="text-xs text-slate-500">
                        {session.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <BookOpen className="h-12 w-12 text-slate-300 mb-2" />
            <h3 className="text-lg font-medium text-slate-700">No saved chats yet</h3>
            <p className="text-sm text-slate-500 mt-1">Your bookmarked conversations will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
