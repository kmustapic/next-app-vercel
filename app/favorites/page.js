'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Omiljene serije</h1>
        <Link href="/">
          <button style={{ padding: '10px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Početna
          </button>
        </Link>
      </div>

      {favorites.length === 0 ? (
        <p style={{ marginTop: '20px' }}><em>Trenutno nemate dodane omiljene serije.</em></p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {favorites.map(show => (
            <div key={show.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <Link href={`/show/${show.id}`}>
                <div>
                  <img src={show.image?.medium} alt={show.name} style={{ width: '100%', borderRadius: '10px' }} />
                  <h2 style={{ fontSize: '16px' }}>{show.name}</h2>
                  <p><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
