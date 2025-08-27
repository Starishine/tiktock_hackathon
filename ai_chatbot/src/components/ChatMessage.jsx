export default function ChatMessage({ role = 'assistant', children }) {
    return <div className={`msg ${role}`}>{children}</div>
}