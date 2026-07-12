import { useState, useRef, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Send, Cpu } from 'lucide-react'
import { ChatBubble, TypingIndicator, SuggestedPrompts } from '@/components/ai'
import { FAN_SUGGESTED_PROMPTS, FAN_MOCK_CONVERSATION } from '@/utils/aiDemoData'
import { AppLayout } from '@/components/layout'
import { useAuth } from '@/store/AuthContext'

export default function AIAssistantPage() {
  const { role } = useAuth()
  if (!role) return <Navigate to="/role-select" replace />

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text) => {
    if (!text.trim()) return

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setShowSuggestions(false)
    setIsTyping(true)

    // Simulate AI delay
    setTimeout(() => {
      let aiResponseContent = 'I can help you with stadium navigation, match times, or facilities. (This is a mock response).'
      
      // Basic mock intent matching
      if (text.toLowerCase().includes('food') || text.toLowerCase().includes('halal')) {
        aiResponseContent = FAN_MOCK_CONVERSATION[1].content
      } else if (text.toLowerCase().includes('seat')) {
        aiResponseContent = 'Your seat is in **Section 104, Row G, Seat 24**.\n\nPlease proceed to **Gate 2**, then take the concourse ramp to Level 1. Would you like walking directions on the stadium map?'
      } else if (text.toLowerCase().includes('kickoff') || text.toLowerCase().includes('start')) {
        aiResponseContent = 'The match between Brazil and Germany kicks off at **20:00 EST**.\n\nThe stadium gates are already open, and pre-match entertainment begins at 19:15.'
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(inputValue)
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Header Area */}
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-stadium-400" />
            StadiumOps Assistant
          </h1>
          <p className="text-white/35 text-sm mt-1">
            Multilingual AI support for your match day experience.
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-black/20 rounded-t-3xl border border-white/[0.06] border-b-0 flex flex-col overflow-hidden relative">
          
          {/* Messages Scroll View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-80 animate-fade-up">
                <div className="w-16 h-16 rounded-2xl bg-stadium-500/20 border border-stadium-500/30 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-stadium-400" />
                </div>
                <h3 className="text-white font-bold text-lg">How can I help you today?</h3>
                <p className="text-white/40 text-sm mt-2 max-w-sm mx-auto">
                  Ask me in any language about stadium facilities, finding your seat, or match schedules.
                </p>
                
                {showSuggestions && (
                  <div className="mt-8 flex justify-center">
                    <SuggestedPrompts 
                      prompts={FAN_SUGGESTED_PROMPTS} 
                      onSelect={handleSend} 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Conversation */}
            {messages.map((msg) => (
              <ChatBubble key={msg.id} {...msg} />
            ))}

            {isTyping && <TypingIndicator />}
            
            <div ref={bottomRef} />
          </div>

          {/* Input Area (Sticky Bottom) */}
          <div className="p-4 sm:p-6 bg-gradient-to-t from-[#060c1a] to-transparent border-t border-white/[0.04]">
            <div className="relative flex items-end gap-2 max-w-3xl mx-auto">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-stadium-500/50 focus:ring-1 focus:ring-stadium-500/50 resize-none min-h-[52px] max-h-32 transition-all"
                rows={1}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center rounded-2xl bg-stadium-500 hover:bg-stadium-400 text-[#040b14] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-white/20 uppercase tracking-widest">Powered by Gemini AI</span>
            </div>
          </div>
          
        </div>
      </div>
    </AppLayout>
  )
}
