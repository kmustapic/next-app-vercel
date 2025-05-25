'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function EpisodesPage() {
  const { id } = useParams()
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    if (!id) return
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
  }, [id])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/show/${id}`}>&larr; Povratak na detalje serije</Link>
      </div>

      <h1>Epizode</h1>
      {episodes.length === 0 ? (
        <p>Učitavanje epizoda...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {episodes.map(ep => (
            <div key={ep.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', background: '#f9f9f9' }}>
              <h3>{ep.name}</h3>
              <p><strong>Sezona:</strong> {ep.season} | <strong>Ep:</strong> {ep.number}</p>
              <p><strong>Datum prikazivanja:</strong> {ep.airdate}</p>
              {ep.image?.medium && <img src={ep.image.medium} alt={ep.name} style={{ width: '100%', borderRadius: '6px' }} />}
              {ep.summary && (
                <p style={{ marginTop: '10px' }}>
                  <strong>Opis:</strong><br />
                  <span dangerouslySetInnerHTML={{ __html: ep.summary }} />
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
<Link href={`/show/${id}/episodes`}>
  <button style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px' }}>
    Pogledaj sve epizode
  </button>
</Link> 