import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle, Send, User, Clock, Trash2, Settings, Briefcase } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ServiceManager } from '@/components/admin/ServiceManager'
import { WorkManager } from '@/components/admin/WorkManager'

interface Conversation {
  id: string
  visitor_name: string
  visitor_email: string
  status: string
  created_at: string
  last_message_at: string
}

interface Message {
  id: string
  conversation_id: string
  sender_name: string
  sender_email: string
  content: string
  created_at: string
  is_admin_reply: boolean
}

export default function AdminDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [replyMessage, setReplyMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchConversations()
    subscribeToConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
      subscribeToMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('last_message_at', { ascending: false })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive'
      })
      return
    }

    setConversations(data || [])
  }

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive'
      })
      return
    }

    setMessages(data || [])
  }

  const subscribeToConversations = () => {
    const subscription = supabase
      .channel('admin_conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations'
        },
        () => {
          fetchConversations()
        }
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }

  const subscribeToMessages = (conversationId: string) => {
    const subscription = supabase
      .channel(`admin_messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }

  const sendReply = async () => {
    if (!replyMessage.trim() || !selectedConversation) return

    setIsLoading(true)

    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: selectedConversation.id,
        sender_name: 'Gabriel (Admin)',
        sender_email: 'admin@portfolio.com',
        content: replyMessage.trim(),
        is_admin_reply: true
      })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive'
      })
      setIsLoading(false)
      return
    }

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', selectedConversation.id)

    setReplyMessage('')
    setIsLoading(false)
  }

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive'
      })
      return
    }

    // Remove message from local state
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
    
    toast({
      title: 'Success',
      description: 'Message deleted successfully',
    })
  }

  const deleteConversation = async (conversationId: string) => {
    // First delete all messages in the conversation
    const { error: messagesError } = await supabase
      .from('messages')
      .delete()
      .eq('conversation_id', conversationId)

    if (messagesError) {
      toast({
        title: 'Error',
        description: 'Failed to delete conversation messages',
        variant: 'destructive'
      })
      return
    }

    // Then delete the conversation
    const { error: conversationError } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)

    if (conversationError) {
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive'
      })
      return
    }

    // Update local state
    setConversations(prev => prev.filter(conv => conv.id !== conversationId))
    
    // Clear selected conversation if it was the one deleted
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null)
      setMessages([])
    }
    
    toast({
      title: 'Success',
      description: 'Conversation deleted successfully',
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendReply()
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content and customer conversations</p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conversations" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="works" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Works
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversations">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Conversations ({conversations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <h3 className="font-medium">{conversation.visitor_name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{conversation.visitor_email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(conversation.last_message_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                              {conversation.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteConversation(conversation.id)
                              }}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Messages */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedConversation ? (
                      `Chat with ${selectedConversation.visitor_name}`
                    ) : (
                      'Select a conversation'
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-[500px]">
                  {selectedConversation ? (
                    <>
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.is_admin_reply ? 'justify-end' : 'justify-start'} group`}
                          >
                            <div className="flex items-start gap-2 max-w-xs lg:max-w-md">
                              <div
                                className={`px-3 py-2 rounded-lg ${
                                  message.is_admin_reply
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {new Date(message.created_at).toLocaleTimeString()}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteMessage(message.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Input */}
                      <div className="flex gap-2">
                        <Textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your reply..."
                          disabled={isLoading}
                          className="flex-1 min-h-[40px] max-h-[120px]"
                        />
                        <Button 
                          onClick={sendReply} 
                          disabled={isLoading || !replyMessage.trim()}
                          size="icon"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      Select a conversation to start chatting
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="works">
            <WorkManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}