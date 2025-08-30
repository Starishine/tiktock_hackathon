import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ChatMessage component with flexible bubble
const ChatMessage = ({ role, children }) => (
    <div style={{
        display: 'flex',
        justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        width: '100%'
    }}>
        <div style={{
            display: 'inline-block',
            maxWidth: '75%',
            padding: '12px 16px',
            backgroundColor: role === 'user' ? '#c5e4fe' : '#fff4e7',
            borderRadius: '12px',
            color: role === 'user' ? '#4a148c' : '#0d47a1',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap'
        }}>
            {children}
        </div>
    </div>
)

const SuggestionChip = ({ text, onClick }) => (
    <button
        onClick={() => onClick(text)}
        style={{
            padding: '8px 16px',
            margin: '4px',
            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
            border: '1px solid #ccc',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'white'
        }}
    >
        {text}
    </button>
)

const CreatorCard = ({ title, items, footer }) => (
    <div style={{
        border: '1px solid #d0bdf4',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#fcf6f5',
        color: '#222222',
        maxWidth: '100%'
    }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2575fc' }}>{title}</h3>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '8px',
            backgroundColor: '#eaeaeaff',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#333333'
        }}>
            {items.map((item, idx) => <div key={idx}>{item}</div>)}
        </div>
        {footer && (
            <div style={{ 
                marginTop: '12px', 
                padding: '8px', 
                backgroundColor: '#e3f2fd', 
                borderRadius: '6px',
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#0d47a1'
            }}>
                {footer}
            </div>
        )}
    </div>
)

const seedGreeting = (
    <span style={{ color: '#3b3b98' }}>
        Hi! I'm your AI Creator Assistant. I can help you discover TikTok creators for any topic.
        Just click one of the buttons below or type your request!
    </span>
)

export default function UserInterface() {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', type: 'text', content: seedGreeting },
    ])

    const quicks = ['Cooking creators', 'Fitness creators', 'Dance creators']

    function addUserQuery(q) {
        setMessages(m => [...m, { role: 'user', type: 'text', content: q }])
        setTimeout(() => respond(q), 220)
    }

    async function respond(q) {
        const topic = q.toLowerCase()

        if (topic.includes('fitness')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '💪 Top Fitness Creators:',
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
                        title: '🍳 Top Cooking Creators:',
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
                        title: '💃 Top Dance Creators:',
                        items: [
                            '@charlidamelio — TikTok dance trends',
                            '@addisonre — Viral choreography',
                            '@tiktokdancearmy — Community dance tutorials',
                        ],
                        footer: 'Looking for creators in a specific dance style?'
                    }
                }
            ])
        } else {
            setMessages(m => [
                ...m,
                { role: 'assistant', type: 'text', content: 'Try clicking one of the buttons above to discover creators for Cooking, Fitness, or Dance!' }
            ])
        }

        try {
            const response = await fetch('/api/discover-creators', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: q, type: 'creator_discovery' })
            })

            if (response.ok) {
                const data = await response.json()
                console.log('API response received:', data)
            }
        } catch (error) {
            console.error('Background API call failed:', error)
        }
    }

    function handleSend() {
        const q = input.trim()
        if (!q) return
        setInput('')
        addUserQuery(q)
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#222222' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                {/* Header */}
                <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #d0bdf4' }}>
                    {/* Back Button */}
                    <button 
                        className="btn" 
                        style={{ 
                            width: '36px',
                            height: '36px',
                            fontSize: '16px',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                            color: 'white'
                        }} 
                        onClick={() => navigate('/')}
                    >
                        ←
                    </button>

                    {/* Centered Text */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#2575fc', fontSize: 25 }}>Creator Assistant</div>
                        <div style={{ color: '#6a11cb', fontSize: 13 }}>Discover TikTok creators by topic</div>
                    </div>
                </div>

                {/* Messages */}
                <div style={{ marginBottom: '20px' }}>
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
                </div>

                {/* Quick chips */}
                <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {quicks.map(q => (
                        <SuggestionChip key={q} text={q} onClick={addUserQuery} />
                    ))}
                </div>

                {/* Composer */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a topic…"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: '1px solid #c3bef0',
                            borderRadius: '24px',
                            fontSize: '14px',
                            outline: 'none',
                            color: '#2f2f2f'
                        }}
                    />
                    <button 
                        onClick={handleSend}
                        style={{
                            width: '36px',
                            height: '36px',
                            fontSize: '16px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                            color: 'white'
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    )
}
