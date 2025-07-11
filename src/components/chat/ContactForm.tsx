import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle } from 'lucide-react'

interface ContactFormProps {
  onStartChat: (name: string, email: string) => void
}

export const ContactForm = ({ onStartChat }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.email.trim()) {
      onStartChat(formData.name.trim(), formData.email.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-background/90 p-6 sm:p-8 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 backdrop-blur-sm w-full lg:w-1/2">
      <div className="text-center mb-6">
        <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Start a Conversation
        </h3>
        <p className="text-muted-foreground">
          Let's chat! I'll respond as soon as I'm available.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          className="shadow-sm hover:shadow-md transition-shadow duration-300"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          className="shadow-sm hover:shadow-md transition-shadow duration-300"
          required
        />
        <Button
          type="submit"
          className="w-full transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          disabled={!formData.name.trim() || !formData.email.trim()}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Start Chat
        </Button>
      </form>
    </div>
  )
}