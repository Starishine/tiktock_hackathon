import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Mock components for demonstration
const ChatMessage = ({ role, children }) => (
    <div style={{
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: role === 'user' ? '#c5e4fe' : '#fff4e7',
        borderRadius: '12px',
        marginLeft: role === 'user' ? '40px' : '0',
        marginRight: role === 'assistant' ? '40px' : '0',
        color: role === 'user' ? '#4a148c' : '#0d47a1'
    }}>
        {children}
    </div>
)

const SuggestionChip = ({ text, onClick }) => (
    <button
        onClick={() => onClick(text)}
        style={{
            padding: '8px 16px',
            margin: '4px',
            background: 'linear-gradient(135deg, #bba6e3, #ffb3c6, #ffe5a9)',
            border: '1px solid #ffb5e8',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#5d1451'
        }}
    >
        {text}
    </button>
)

const ContentCard = ({ title, content, footer }) => (
    <div style={{
        border: '1px solid #d0bdf4',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#fcf6f5',
        color: '#222222'
    }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#ff6f91' }}>{title}</h3>
        <div style={{
            backgroundColor: '#eaeaeaff',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            color: '#333333'
        }}>
            {content}
        </div>
        {footer && (
            <div style={{
                marginTop: '12px',
                padding: '8px',
                backgroundColor: '#ffe5ec',
                borderRadius: '6px',
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#6a0572'
            }}>
                {footer}
            </div>
        )}
    </div>
)

const seedGreeting = (
    <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        </div>
        <span style={{ color: '#3b3b98' }}>
            Hi! I'm your AI Creator Assistant. I can help you generate scripts, optimize your uploads, and create engaging content for any platform.
            Just tell me what type of content you want to create and I'll help you craft the perfect script or give you optimization tips!
        </span>
    </>
)

export default function UserInterface() {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', type: 'text', content: seedGreeting },
    ])

    const quicks = ['TikTok script', 'TikTok hook', 'Instagram caption', 'Upload optimization tips']

    function addUserQuery(q) {
        setMessages(m => [...m, { role: 'user', type: 'text', content: q }])
        setTimeout(() => respond(q), 220)
    }

    async function respond(q) {
        const topic = q.toLowerCase()

        if (topic.includes('tiktok') && topic.includes('script')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '⚡ TikTok Script Template',
                        content: `HOOK (0-3 seconds):
"POV: You just discovered [surprising thing]"
"This will change your life in 30 seconds"
"Nobody talks about this but..."

SETUP (3-5 seconds):
Quick context or problem setup
"So basically what happened was..."
"Here's the tea..."

MAIN CONTENT (5-25 seconds):
- Point 1: [Main revelation/tip]
- Point 2: [Quick example or proof]
- Point 3: [Why it matters/result]

Keep it punchy and visual!

PAYOFF/CONCLUSION (25-30 seconds):
"And that's how you [solve problem/achieve goal]"
"Try this and thank me later"
"Comment if this worked for you!"

TEXT OVERLAY TIPS:
- Use large, readable fonts
- Max 2-3 words per screen
- Highlight key points
- Match the audio rhythm

VISUAL CUES:
- Quick cuts every 2-3 seconds
- Use trending effects/transitions
- Show don't tell when possible`,
                        footer: 'Want a script for a specific TikTok trend or niche? Just ask!'
                    }
                }
            ])
        } else if (topic.includes('tiktok') && (topic.includes('hook') || topic.includes('script'))) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '⚡ TikTok Hook Examples',
                        content: `CURIOSITY HOOKS:
"You've been doing [common thing] wrong your entire life..."
"Nobody talks about this, but..."
"I wish someone told me this sooner..."

STORY HOOKS:
"So this happened to me yesterday..."
"My [friend/family member] just sent me this..."
"POV: You're the person who..."

EDUCATIONAL HOOKS:
"Here's what they don't teach you in school..."
"3 things I learned after [experience]..."
"The real reason why [phenomenon]..."

TRENDING HOOKS:
"Tell me you're [type of person] without telling me..."
"Things that just make sense..."
"Red flags in [situation]..."

CONTROVERSY HOOKS:
"Unpopular opinion but..."
"Am I the only one who thinks..."
"This is going to be controversial but..."`,
                        footer: 'Want hooks tailored to your specific niche or topic? Let me know!'
                    }
                }
            ])
        } else if (topic.includes('instagram') && topic.includes('caption')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '📸 Instagram Caption Formula',
                        content: `ATTENTION-GRABBING OPENER:
Start with a question, surprising fact, or bold statement.
Examples:
- "Here's something no one tells you about..."
- "Raise your hand if you've ever..."
- "Plot twist: [surprising revelation]"

MAIN CONTENT:
- Share your story/insight (2-3 sentences)
- Add value or entertainment
- Be authentic and relatable

ENGAGEMENT:
- Ask a question
- Use relevant hashtags (5-10 for optimal reach)
- Include a call-to-action

STRUCTURE EXAMPLE:
"POV: You finally figured out [relatable situation] 😅

[2-3 sentences sharing your experience or tip]

What's your go-to method for [topic]? Drop it in the comments! 👇

#relatablecontent #lifestyle #tips #trending #explore"

CAPTION LENGTH: 
- Carousel posts: Longer captions (125+ words)
- Single posts: Medium length (50-125 words)
- Reels: Shorter captions (under 50 words)`,
                        footer: 'Need captions for a specific post type or niche? Just describe your content!'
                    }
                }
            ])
        } else if (topic.includes('optimization') || topic.includes('upload')) {
            setMessages(m => [
                ...m,
                {
                    role: 'assistant', type: 'card', content: {
                        title: '🚀 Upload Optimization Guide',
                        content: `YOUTUBE OPTIMIZATION:
✅ Title: 60 characters max, include main keyword
✅ Thumbnail: High contrast, readable text, faces work well
✅ Description: Front-load keywords in first 125 characters
✅ Tags: Use relevant keywords (5-8 tags)
✅ Upload time: 2-4 PM EST, Tuesday-Thursday
✅ End screen: Add subscribe button and related videos

TIKTOK OPTIMIZATION:
✅ Post time: 6-10 AM, 7-9 PM EST
✅ Hashtags: Mix popular and niche (3-5 hashtags)
✅ Length: 15-30 seconds for maximum engagement
✅ Trending sounds: Use current audio trends
✅ Text overlay: Keep it minimal and readable

INSTAGRAM OPTIMIZATION:
✅ Stories: Post 3-5 per day consistently
✅ Reels: 15-30 seconds, trending audio
✅ Posts: Square format (1080x1080) works best
✅ Hashtags: Research and use 5-10 relevant ones
✅ Post time: 11 AM-1 PM, 7-9 PM local time

GENERAL TIPS:
- Consistency is key (regular posting schedule)
- Engage with comments within first hour
- Cross-promote on different platforms
- Analyze your analytics weekly`,
                        footer: 'Want specific optimization tips for your content type or platform?'
                    }
                }
            ])
        } else {
            const res = await fetch(`http://127.0.0.1:5000/scriptgen/${topic}`)
            const data = await res.text()
            console.log(data)
            setMessages(m => [
                ...m,
                { role: 'assistant', type: 'text', content: data }
            ]);
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #d0bdf4' }}>
                    <span style={{
                        backgroundColor: 'linear-gradient(135deg, #ff9671, #ffc75f, #f9f871)',
                        background: 'linear-gradient(135deg, #ff9671, #ffc75f, #f9f871)',
                        padding: '12px',
                        borderRadius: '50%',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                        color: '#ffffff'
                    }}>
                        🎬
                    </span>
                    {/* Back Button */}
                    <button className="btn" style={{ marginBottom: 20 }} onClick={() => navigate('/')}>
                        ← Back to Landing
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 20 }}>
                        <div style={{ fontWeight: 700, color: '#845ec2' }}>Creator Assistant</div>
                        <div style={{ color: '#6a0572', fontSize: 13 }}>AI script generation · Upload optimization · Content creation</div>
                    </div>
                </div>

                {/* Messages */}
                <div style={{ marginBottom: '20px' }}>
                    {messages.map((m, i) => {
                        if (m.type === 'card' && m.role === 'assistant') {
                            return (
                                <ChatMessage role="assistant" key={i}>
                                    <ContentCard title={m.content.title} content={m.content.content} footer={m.content.footer} />
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
                        placeholder="Ask for scripts, optimization tips, or content ideas..."
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
                            padding: '12px 16px',
                            background: 'linear-gradient(135deg, #845ec2, #ff6f91, #ffc75f)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    )
}
