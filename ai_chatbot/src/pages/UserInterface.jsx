import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatMessage from '../components/ChatMessage'
import SuggestionChip from '../components/SuggestionChip'
import CreatorCard from '../components/CreatorCard'

const seedGreeting = (
    <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="badge">✨</span>
            <strong>Content Discovery</strong>
        </div>
        Hi! I'm your TikTok Trending Discovery assistant. I can help you find the popular creators, audio and videos.
        Just tell me what subject you're interested in and I’ll generate a curated list for you!
    </>
)

export default function UserInterface() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', type: 'text', content: seedGreeting },
    ])
    const navigate = useNavigate()

    const quicks = ['Cooking creators', 'Dance creators', 'Fitness creators']

    function addUserQuery(q) {
        setMessages(m => [...m, { role: 'user', type: 'text', content: q }])
        setTimeout(() => respond(q), 220)
    }

    function respond(q) {
        // Tiny demo router—replace with real API later
        const topic = q.toLowerCase()
        if (topic.includes('fitness')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '💪  “Top Fitness Creators:”',
                        items: [
                            '@chloe_t — Home workout routines',
                            '@fitnesswithpj — Strength training tips',
                            '@syattfitness — Evidence-based fitness',
                            '@alexia_clark — Creative workout variations',
                            '@whitneysimmons — Gym tutorials',
                        ],
                        footer: 'Need creators for specific fitness goals or equipment?'
                    }
                }
            ])
        } else if (topic.includes('cooking')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '🍳  “Top Cooking Creators:”',
                        items: [
                            '@gordonramsayofficial — Pro chef with quick tips',
                            '@emmymadeinjapan — International cuisine explorer',
                            '@thefoodbabe — Healthy meal prep expert',
                            '@cooking_with_shereen — Middle Eastern cuisine',
                            '@pro_home_cooks — Advanced cooking techniques',
                        ],
                        footer: 'Want creators for a specific cuisine or cooking style?'
                    }
                }
            ])
        } else if (topic.includes('dance')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '💃  “Top Dance Creators:”',
                        items: [
                            '@charlidamelio — Most followed tiktoker',
                            '@justmaiko — Features intricate choreo ',
                            '@isabellaboylston — Professional Ballet Dancer',
                            '@jabbawockeez — Dance Crew ',
                            '@nianaguerrero — Features fun and high-energy dances',
                        ],
                        footer: 'Need creators for a specific dance style?'
                    }
                }
            ])
        } else {
            setMessages(m => [
                ...m,
                { role: 'assistant', type: 'text', content: "Got it! Ask me about a topic like “trending creators”, “trending audio”, or “trending videos” and I’ll curate a list." }
            ])
        }
    }

    function handleSend() {
        const q = input.trim()
        if (!q) return
        setInput('')
        addUserQuery(q)
    }

    return (
        <div className="container">
            <div className="chat-wrap">
                <div className="chat-header">
                    <span className="badge">🧭</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 20 }}>
                        <div style={{ fontWeight: 700 }}>Content Discovery</div>
                        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Find trending topics · suggestions & lists</div>
                    </div>
                </div>

                {/* Back Button */}
                <button className="btn" style={{ marginBottom: 20 }} onClick={() => navigate('/')}>
                    ← Back to Landing
                </button>

                {/* Messages */}
                {messages.map((m, i) => {
                    if (m.type === 'card' && m.role === 'assistant') {
                        return (
                            <ChatMessage role="assistant" key={i}>
                                <CreatorCard title={m.content.title} items={m.content.items} footer={m.content.footer} />
                            </ChatMessage>
                        )
                    }
                    return (
                        <ChatMessage role={m.role} key={i}>
                            {m.content}
                        </ChatMessage>
                    )
                })}

                {/* Quick chips */}
                <div className="chips">
                    {quicks.map(q => (
                        <SuggestionChip key={q} text={q} onClick={addUserQuery} />
                    ))}
                </div>

                {/* Composer */}
                <div className="composer">
                    <div className="inputbar">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about various trending topics…"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send" onClick={handleSend}>➤</button>
                    </div>
                </div>
            </div>
        </div>
    )
}