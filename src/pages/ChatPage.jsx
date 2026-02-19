import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import ChatBubble from '../components/ChatBubble'
import CartSidebar from '../components/CartSidebar'
import TypingIndicator from '../components/TypingIndicator'

const mockMessages = [
  { id: '1', text: 'Bonjour ! Je suis l\'agent commercial Souk AI. Comment puis-je vous aider ?', isUser: false },
  { id: '2', text: 'Je cherche un tapis berbère.', isUser: true },
  { id: '3', text: 'J\'ai plusieurs tapis berbères authentiques. Notre Tapis Berbère Fait Main à 890 MAD est très populaire.', isUser: false },
]

const mockCartItems = [
  { id: '2', name: 'Tapis Berbère Fait Main', price: 890, quantity: 1, image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=100&h=100&fit=crop' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [showTyping, setShowTyping] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  // Auto-scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showTyping])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now().toString(), text: input, isUser: true }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          text: 'Merci pour votre message. L\'intégration n8n permettra des réponses en temps réel.',
          isUser: false,
        },
      ])
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)]">
        <div className="flex-1 overflow-y-auto p-4 lg:max-w-3xl lg:mx-auto lg:w-full" ref={containerRef}>
          <div className="space-y-4">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m.text} isUser={m.isUser} />
            ))}
            {showTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t border-amber-100 bg-amber-50/30">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écrivez votre message..."
              className="flex-1 px-4 py-3 rounded-xl border border-amber-200 bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
            >
              Envoyer
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="px-4 py-3 bg-amber-100 text-amber-900 font-semibold rounded-xl hover:bg-amber-200 flex items-center gap-1"
              aria-label="Voir le panier"
            >
              🛒 {mockCartItems.length}
            </button>
          </div>
        </div>
      </div>
      {/* Cart panel - desktop: always visible on right | mobile: sidebar overlay */}
      <div className="hidden lg:block w-80 xl:w-96 border-l border-amber-100 bg-white min-h-[calc(100vh-4rem)]">
        <div className="sticky top-16 p-4">
          <h3 className="font-bold text-amber-950 mb-4">Récapitulatif panier</h3>
          {mockCartItems.length === 0 ? (
            <p className="text-amber-600 text-sm">Votre panier est vide.</p>
          ) : (
            <>
              <ul className="space-y-3 mb-4">
                {mockCartItems.map((item) => (
                  <li key={item.id} className="flex gap-3 p-2 rounded-lg bg-amber-50/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-amber-900 text-sm truncate">{item.name}</p>
                      <p className="text-amber-600 text-sm">{item.price} MAD</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-amber-950 mb-2">
                <span>Total</span>
                <span>{mockCartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0)} MAD</span>
              </div>
              <button className="w-full py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700">
                Passer commande
              </button>
            </>
          )}
        </div>
      </div>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} items={mockCartItems} />
    </div>
  )
}
