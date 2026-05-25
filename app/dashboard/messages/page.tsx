'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Send, ArrowLeft } from 'lucide-react'
import { mockConversations, mockMessages, mockUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { Conversation, Message } from '@/lib/types'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const filteredConversations = mockConversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: String(messages.length + 1),
      senderId: 'user',
      senderName: mockUser.fullName,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      type: 'user'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with medical staff and doctors</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className={cn(
          'lg:col-span-1',
          selectedConversation ? 'hidden lg:block' : ''
        )}>
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    'flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/50',
                    selectedConversation?.id === conversation.id && 'bg-muted'
                  )}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={cn(
                      'text-sm',
                      conversation.type === 'staff' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary text-secondary-foreground'
                    )}>
                      {conversation.participantName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">
                        {conversation.participantName}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {conversation.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className={cn(
          'lg:col-span-2',
          !selectedConversation ? 'hidden lg:flex lg:items-center lg:justify-center' : ''
        )}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selectedConversation.participantName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{selectedConversation.participantName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{selectedConversation.type}</p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex',
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div className={cn(
                          'flex max-w-[80%] gap-2',
                          message.type === 'user' ? 'flex-row-reverse' : ''
                        )}>
                          {message.type !== 'user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {message.senderName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn(
                            'rounded-lg px-4 py-2',
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          )}>
                            <p className="text-sm">{message.content}</p>
                            <p className={cn(
                              'mt-1 text-xs',
                              message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            )}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
