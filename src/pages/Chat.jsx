import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ArrowDown } from 'lucide-react';
import { sendMessage, getWelcomeMessage } from '../services/chatService';

export default function Chat({ t, lang }) {
    const c = t.chat;
    const [messages, setMessages] = useState([getWelcomeMessage(lang)]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleScroll = () => {
        if (!chatContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        setShowScroll(scrollHeight - scrollTop - clientHeight > 100);
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await sendMessage(userMessage.content, lang);
            setMessages(prev => [...prev, response]);
        } catch {
            setMessages(prev => [...prev, {
                id: Date.now(),
                role: 'assistant',
                content: lang === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Désolé, une erreur est survenue. Réessayez.',
                timestamp: new Date().toISOString(),
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Quick suggestions
    const suggestions = lang === 'ar'
        ? ['أبحث عن زربية', 'أرني الفوانيس', 'ما هي الأسعار؟', 'مساعدة']
        : lang === 'en'
            ? ["I'm looking for a rug", 'Show me lanterns', 'What are the prices?', 'Help']
            : ['Je cherche un tapis', 'Montrez-moi les lanternes', 'Quels sont les prix ?', 'Aide'];

    // Render markdown-like bold text
    const renderContent = (content) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            // Handle line breaks
            return part.split('\n').map((line, j) => (
                <span key={`${i}-${j}`}>
                    {j > 0 && <br />}
                    {line}
                </span>
            ));
        });
    };

    return (
        <div className="chat-page page">
            <div className="chat-container page-container">
                {/* Header */}
                <div className="chat-header animate-fade-in-up">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h1 className="chat-title">{c.title}</h1>
                            <p className="chat-subtitle">{c.subtitle}</p>
                        </div>
                    </div>
                    <div className="chat-status">
                        <span className="status-dot" />
                        <span className="status-text">Online</span>
                    </div>
                </div>

                {/* Messages */}
                <div
                    className="chat-messages glass"
                    ref={chatContainerRef}
                    onScroll={handleScroll}
                >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message message-${msg.role} animate-fade-in-up`}>
                            <div className="message-avatar">
                                {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                            </div>
                            <div className="message-bubble">
                                <div className="message-content">{renderContent(msg.content)}</div>
                                <div className="message-time">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message message-assistant animate-fade-in">
                            <div className="message-avatar">
                                <Bot size={18} />
                            </div>
                            <div className="message-bubble typing-bubble">
                                <div className="typing-indicator">
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />

                    {showScroll && (
                        <button className="scroll-bottom-btn" onClick={scrollToBottom}>
                            <ArrowDown size={16} />
                        </button>
                    )}
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                    <div className="chat-suggestions animate-fade-in-up">
                        {suggestions.map((s, i) => (
                            <button key={i} className="suggestion-chip" onClick={() => { setInput(s); }}>
                                <Sparkles size={12} />
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chat-input-area glass animate-fade-in-up">
                    <input
                        type="text"
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={c.placeholder}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            <style>{`
        .chat-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          gap: 1rem;
          max-width: 900px;
          height: calc(100vh - 72px);
        }

        /* Header */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
        }
        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .chat-avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-neutral-900);
        }
        .chat-title {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .chat-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .chat-status {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          animation: pulse-glow 2s infinite;
        }
        .status-text {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        .message {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }
        .message-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .message-assistant .message-avatar {
          background: rgba(245, 158, 11, 0.15);
          color: var(--color-primary-400);
        }
        .message-user .message-avatar {
          background: rgba(96, 165, 250, 0.15);
          color: #60a5fa;
        }
        .message-bubble {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .message-assistant .message-bubble {
          background: var(--surface-elevated);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .message-user .message-bubble {
          background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
          color: var(--color-neutral-900);
        }
        .message-time {
          font-size: 0.7rem;
          margin-top: 6px;
          opacity: 0.5;
        }

        /* Typing */
        .typing-bubble {
          padding: 16px 20px;
        }
        .typing-indicator {
          display: flex;
          gap: 4px;
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary-400);
          animation: typing-dot 1.4s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        .scroll-bottom-btn {
          position: sticky;
          bottom: 8px;
          align-self: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-primary-500);
          color: var(--color-neutral-900);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .scroll-bottom-btn:hover {
          transform: scale(1.1);
        }

        /* Suggestions */
        .chat-suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .suggestion-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: var(--surface-card);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-sans);
        }
        .suggestion-chip:hover {
          border-color: var(--color-primary-500);
          color: var(--color-primary-400);
          background: rgba(245, 158, 11, 0.08);
        }

        /* Input */
        .chat-input-area {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: var(--radius-lg);
        }
        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: var(--font-sans);
        }
        .chat-input::placeholder {
          color: var(--text-muted);
        }
        .chat-send-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
          color: var(--color-neutral-900);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: var(--shadow-glow);
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
}
