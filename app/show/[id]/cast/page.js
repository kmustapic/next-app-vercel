'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function CastPage() {
  const { id } = useParams()
  const [cast, setCast] = useState([])

  useEffect(() => {
    if (!id) return
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then(res => res.json())
      .then(data => setCast(data))
  }, [id])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/show/${id}`}>&larr; Povratak na detalje serije</Link>
      </div>

      <h1>Glumačka postava</h1>

      {cast.length === 0 ? (
        <p>Učitavanje glumaca...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {cast.map(({ person, character }) => (
            <div key={person.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center', background: '#f9f9f9' }}>
              {person.image?.medium && (
                <img src={person.image.medium} alt={person.name} style={{ width: '100%', borderRadius: '8px' }} />
              )}
              <h3 style={{ marginTop: '10px' }}>{person.name}</h3>
              <p><em>kao</em> <strong>{character.name}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

<Link href={`/show/${id}/cast`}>
  <button style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px' }}>
    Pogledaj sve glumce
  </button>
</Link>
