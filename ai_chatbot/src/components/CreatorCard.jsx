export default function CreatorCard({ title, items = [], footer }) {
    return (
        <div className="card-msg">
            <h4>{title}</h4>
            <ul>
                {items.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            {footer && <p style={{ marginTop: 8, color: '#9fb0c9' }}>{footer}</p>}
        </div>
    )
}