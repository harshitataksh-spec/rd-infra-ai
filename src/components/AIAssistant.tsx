import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  whatsappNumber: string;
  onExploreProperties: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  whatsappNumber,
  onExploreProperties,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste! I am your RD INFRA Property & Investment Assistant. I can help you find verified properties across Gurugram, evaluate corridor ROI (NH-48, Sohna, Delhi–Mumbai Expressway, Vrindavan), calculate EMIs, or guide you through buyer checklists. How may I assist you today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Find properties within my budget',
    'Which location is suitable for my requirement?',
    'Calculate my estimated EMI',
    'What should I check before buying land in Gurgaon?',
    'Tell me about Sohna Road farmhouse growth',
    'Help me find a rental property',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Local intelligent fallback response engine in case server route is not configured or offline
  const generateLocalResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase();

    if (lower.includes('budget') || lower.includes('cost') || lower.includes('price')) {
      return (
        "RD INFRA offers tailored portfolios across distinct budget brackets:\n\n" +
        "• Under ₹1 Cr: Freehold spiritual plots in Vrindavan (from ₹45 Lac) & entry parcels on the Delhi–Mumbai corridor.\n" +
        "• ₹1 Cr to ₹2.5 Cr: Prime 1200 sq.yd freehold farmhouse plots on NH-48 Delhi-Jaipur highway belt.\n" +
        "• ₹2.5 Cr to ₹5 Cr: High-rise luxury penthouses on Golf Course Extension Road & 1-Acre Aravali luxury farmsteads in Sohna.\n" +
        "• ₹5 Cr+: Strategic industrial/logistics land parcels (150-ft road frontage) & luxury DLF independent kothis.\n\n" +
        "Would you like me to filter available listings for your exact target price?"
      );
    }

    if (lower.includes('location') || lower.includes('sohna') || lower.includes('nh-48') || lower.includes('corridor') || lower.includes('expressway')) {
      return (
        "Here is RD INFRA's micro-market corridor analysis:\n\n" +
        "1. Sohna / Western Peripheral: Ideal for luxury farmhouses and second homes. Blessed with pristine Aravali views, low density agri-zoning, and 20 min direct access via the Sohna Elevated Corridor.\n" +
        "2. NH-48 Delhi–Jaipur Corridor: High industrial and logistics value. Rapidly appreciating commercial and plotted farmland between Bilaspur & Dharuhera.\n" +
        "3. Delhi–Mumbai Expressway: North India's fastest economic lifeline. Highest long-term capital appreciation for strategic investors.\n" +
        "4. Vrindavan Corridor: High cultural inflow and sacred second home demand via the Yamuna Expressway.\n\n" +
        "Which of these corridors aligns best with your investment horizon?"
      );
    }

    if (lower.includes('emi') || lower.includes('loan') || lower.includes('calculate') || lower.includes('interest')) {
      return (
        "For a standard Indian home loan at ~8.5% p.a. over 20 years:\n\n" +
        "• ₹ 50 Lakh loan: ~₹ 43,391 / month\n" +
        "• ₹ 1 Crore loan: ~₹ 86,782 / month\n" +
        "• ₹ 2 Crore loan: ~₹ 1,73,565 / month\n\n" +
        "You can also use our interactive Investment Calculator right below this section to test custom down payments, rental yield returns, and 10-year appreciation projections!"
      );
    }

    if (lower.includes('check') || lower.includes('legal') || lower.includes('document') || lower.includes('registry')) {
      return (
        "Critical buyer diligence checklist for Delhi-NCR & Haryana real estate:\n\n" +
        "1. Jamabandi & Nakal: Verify the latest title entries in the revenue records.\n" +
        "2. Mutation (Inteqal): Confirm mutation is entered in the current seller's name without pending litigation.\n" +
        "3. Demarcation (Nishandehi): Physical revenue demarcation with concrete pillars and road access.\n" +
        "4. Non-Encumbrance Certificate (12-30 years): Confirms zero prior mortgages or bank charges.\n" +
        "5. Zoning / CLU Clearances: Verify land use classification under Haryana development master plans.\n\n" +
        "At RD INFRA, every project and property passes complete 100% legal verification before listing."
      );
    }

    if (lower.includes('rent') || lower.includes('lease') || lower.includes('tenant')) {
      return (
        "We have Grade-A rental options including:\n\n" +
        "• 3-BHK luxury garden residences on Sohna Road (approx. ₹65,000 / mo).\n" +
        "• Plug-and-play corporate commercial office floors near Cyber City Hub (₹2.85 Lac / mo with 40+ workstations).\n\n" +
        "Our team manages lease deed agreements, tenant verification, and move-in facilitation. Would you like to schedule an inspection?"
      );
    }

    return (
      "Thank you for your question. RD INFRA provides comprehensive real estate advisory for residential homes, gated farmhouse estates, and institutional land corridors across Gurugram and Delhi-NCR.\n\n" +
      "For specific project brochures, master plans, or on-ground site visits, you can also speak directly with Mr. Ravinder Deshwal's advisory desk via WhatsApp or by scheduling a callback."
    );
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // First attempt server-side proxy route `/api/ai-assistant`
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply || generateLocalResponse(query),
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // High fidelity local response fallback
        await new Promise((resolve) => setTimeout(resolve, 800));
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateLocalResponse(query),
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateLocalResponse(query),
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0A4D92]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Real Estate Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Your AI Property Assistant
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Get personalized property recommendations, understand your investment options, and find answers to your real-estate questions in seconds.
          </p>
        </div>

        {/* Chat Container Card */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[580px]">
          {/* Assistant Header */}
          <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0A4D92] flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <span>RD INFRA Property Intelligence</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Online • Knowledge base updated for Delhi-NCR Corridors
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    role: 'assistant',
                    content:
                      'Chat reset. How can I assist you with your property or investment queries today?',
                    timestamp: 'Just now',
                  },
                ]);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#0A4D92] text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-700/80 text-slate-100 border border-slate-600/70 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-lg">
                <div className="w-8 h-8 rounded-xl bg-[#0A4D92] text-white shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-700/80 text-slate-300 text-xs rounded-tl-none flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-slate-400 ml-1">Analyzing property data...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Suggested Prompts Quick Bar */}
          <div className="px-6 py-2.5 bg-slate-950/40 border-t border-slate-700/60 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
              Suggestions:
            </span>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-assistant-input"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about properties, budget estimates, corridor appreciation, or legal steps..."
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
              />
              <button
                id="ai-send-btn"
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 bg-[#0A4D92] hover:bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Support Bridge */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 px-2">
          <span>AI outputs are real-time informational guides grounded in market data.</span>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20RD%20INFRA,%20I%20used%20your%20AI%20Assistant%20and%20would%20like%20to%20speak%20with%20an%20expert.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 mt-1 sm:mt-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Human Advisor on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
