import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, X, MessageCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

// Database types
interface Message {
  id: string
  conversation_id: string
  sender_name: string
  sender_email: string
  content: string
  created_at: string
  is_admin_reply: boolean
}
import { useToast } from '@/hooks/use-toast'

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  visitorName: string
  visitorEmail: string
  conversationId: string | null
  onConversationStart: (id: string) => void
}

export const ChatInterface = ({ 
  isOpen, 
  onClose, 
  visitorName, 
  visitorEmail,
  conversationId,
  onConversationStart 
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (conversationId) {
      fetchMessages()
      subscribeToMessages()
    }
  }, [conversationId])

  const fetchMessages = async () => {
    if (!conversationId) return

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

  const subscribeToMessages = () => {
    if (!conversationId) return

    const subscription = supabase
      .channel(`messages:${conversationId}`)
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

  const startConversation = async () => {
    setIsLoading(true)
    
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        visitor_name: visitorName,
        visitor_email: visitorEmail,
        status: 'active'
      })
      .select()
      .single()

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to start conversation',
        variant: 'destructive'
      })
      setIsLoading(false)
      return
    }

    onConversationStart(data.id)
    setIsLoading(false)
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return

    setIsLoading(true)

    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_name: visitorName,
        sender_email: visitorEmail,
        content: newMessage.trim(),
        is_admin_reply: false
      })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      })
      setIsLoading(false)
      return
    }

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversationId)

    setNewMessage('')
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Chat with Gabriel</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!conversationId ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Hi {visitorName}! Ready to start our conversation?
              </p>
              <Button onClick={startConversation} disabled={isLoading}>
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.is_admin_reply ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.is_admin_reply
                        ? 'bg-muted text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        {conversationId && (
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={isLoading || !newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}