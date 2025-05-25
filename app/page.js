'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

export default function Home() {
  const [allShows, setAllShows] = useState([])
  const [visibleShows, setVisibleShows] = useState([])
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(res => res.json())
      .then(data => {
        const sortirano = data
          .filter(show => show.rating?.average !== null)
          .sort((a, b) => b.rating.average - a.rating.average)
        setAllShows(sortirano)
        setVisibleShows(sortirano.slice(0, limit))
      })
  }, [])

  useEffect(() => {
    setVisibleShows(allShows.slice(0, limit))
  }, [limit, allShows])

  const ucitajJos = () => {
    setLimit(prev => prev + 20)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Top Serije po Ocjeni</h1>
        <Link href="/favorites">
          <button style={{ padding: '10px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Omiljene serije
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {visibleShows.map(show => (
          <div key={show.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', position: 'relative' }}>
            <Link href={`/show/${show.id}`}>
              <div>
                <img src={show.image?.medium} alt={show.name} style={{ width: '100%' }} />
                <h2 style={{ fontSize: '16px' }}>{show.name}</h2>
                <p><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>
              </div>
            </Link>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <FavoriteButton show={show} mini={true} />
            </div>
          </div>
        ))}
      </div>

      {visibleShows.length < allShows.length && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button onClick={ucitajJos} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Učitaj još serija
          </button>
        </div>
      )}
    </div>
  )
}
