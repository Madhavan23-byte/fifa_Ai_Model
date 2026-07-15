import { useState, useRef, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Send, Zap, BarChart2, ShieldAlert } from 'lucide-react'
import { ChatBubble, TypingIndicator, SuggestedPrompts } from '@/components/ai'
import { COPILOT_SUGGESTED_PROMPTS } from '@/utils/aiDemoData'
import { CrowdStatus, GateStatus } from '@/features/dashboard'
import { AppLayout } from '@/components/layout'
import { sendCopilotMessage } from '@/services/copilotService'
import { useAuth } from '@/store/AuthContext'
import { cn } from '@/utils/cn'

export default function OperationsCopilotPage() {
  const { role } = useAuth()
  if (!role) return <Navigate to="/role-select" replace />

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    try {
      // Real Gemini API call via FastAPI backend
      const data = await sendCopilotMessage({ role: 'organizer', query: text })

      // Format structured JSON into a readable chat bubble
      let actionsText = '';
      if (data.actions && data.actions.length > 0) {
        actionsText = `### Actions\n` + data.actions.map(a => `- ${a}`).join('\n');
      }

      const contentParts = [
        `### Summary\n${data.summary}`,
        `### Recommendation\n${data.recommendation}`,
        actionsText,
        `- **Priority:** ${data.priority}`,
        `- **Confidence:** ${data.confidence}%`,
      ];
      if (data.notes) {
        contentParts.push(`- **Notes:** ${data.notes}`);
      }

      const content = contentParts.filter(Boolean).join('\n\n')

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionRequired: typeof data.priority === 'string' && data.priority.toLowerCase() === 'critical',
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      // Restore input text so user can retry
      setInputValue(text)
      
      // Show error inline in chat — never crash the UI
      const errMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Unable to reach the AI backend.**\n\n${err.message}\n\nYour message was kept in the input box. Please verify your connection and click Send to retry.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionRequired: false,
      }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(inputValue)
    }
  }

  return (
    <AppLayout>
      <div className="h-full flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Context Panel (Data Visualizations) */}
        <div className="hidden lg:flex flex-col w-[400px] flex-shrink-0 gap-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-stadium-400 fill-stadium-400" />
              Operations Copilot
            </h1>
            <p className="text-white/35 text-sm mt-1">
              AI-driven decision support and live analytics.
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {/* Live Context Data widgets */}
            <div className="glass p-4 rounded-2xl border border-stadium-500/20 bg-stadium-500/[0.02]">
              <div className="flex items-center gap-2 mb-2 text-stadium-400">
                <BarChart2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Context Active</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Copilot is currently receiving real-time data from 124 sensors, 4 gates, and 6 active incident reports.
              </p>
            </div>
            
            <CrowdStatus />
            <GateStatus />
          </div>
        </div>

        {/* Right Side: Chat Interface */}
        <div className="flex-1 flex flex-col bg-[#081021] rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl relative">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden p-4 border-b border-white/[0.06] flex items-center gap-3">
             <Zap className="w-5 h-5 text-stadium-400 fill-stadium-400" />
             <span className="font-bold text-white">Operations Copilot</span>
          </div>

          {/* Messages Scroll View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            
            {/* Copilot Intro */}
            {messages.length === 0 && (
              <div className="py-8 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stadium-500/10 border border-stadium-500/20 text-stadium-400 text-xs font-bold mb-4">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Organizer Access Level
                </div>
                <h3 className="text-white font-bold text-2xl mb-3">System Online.</h3>
                <p className="text-white/50 text-sm max-w-lg leading-relaxed mb-8">
                  I am analyzing live stadium telemetry. I can help you predict crowd flow, triage incidents, and draft broadcast alerts. What would you like to investigate?
                </p>
                
                <SuggestedPrompts 
                  prompts={COPILOT_SUGGESTED_PROMPTS} 
                  onSelect={handleSend} 
                />
              </div>
            )}

            {/* Conversation */}
            {messages.map((msg) => (
              <ChatBubble key={msg.id} {...msg} actionRequired={msg.actionRequired} />
            ))}

            {isTyping && <TypingIndicator />}
            
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 bg-gradient-to-t from-[#040b14] to-transparent border-t border-white/[0.04]">
            <div className="relative flex items-end gap-3 max-w-4xl mx-auto">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for an analysis, e.g., 'Gate 3 is at 94% capacity. What are the risks?'"
                className="flex-1 bg-white/[0.05] border border-white/[0.12] rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-stadium-400/50 focus:ring-1 focus:ring-stadium-400/50 resize-none min-h-[56px] max-h-32 transition-all"
                rows={1}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  "w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center rounded-2xl transition-colors",
                  inputValue.trim() && !isTyping 
                    ? "bg-stadium-500 text-black hover:bg-stadium-400" 
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
                aria-label="Send query"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Gemini Engine Active</span>
            </div>
          </div>
          
        </div>
      </div>
    </AppLayout>
  )
}
