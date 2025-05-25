'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

export default function ShowDetails() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [seasons, setSeasons] = useState([])

  useEffect(() => {
    if (!id) return
    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast`)
      .then(res => res.json())
      .then(data => {
        setShow(data)
        const epizode = data._embedded?.episodes || []
        const jedinstveneSezone = [...new Set(epizode.map(ep => ep.season))]
        setSeasons(jedinstveneSezone)
        setSelectedSeason(jedinstveneSezone[0])
      })
  }, [id])

  if (!show) return <div style={{ padding: '20px' }}>Učitavanje...</div>

  const epizodeZaSezonu = show._embedded?.episodes.filter(ep => ep.season === selectedSeason)
  const glumci = [...(show._embedded?.cast || [])].sort((a, b) => a.person.name.localeCompare(b.person.name))

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* IZBORNIK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link href="/">← Povratak</Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="#epizode" style={{ textDecoration: 'none', color: '#0070f3' }}>Epizode</a>
          <a href="#glumci" style={{ textDecoration: 'none', color: '#0070f3' }}>Glumci</a>
          <Link href="/favorites">
            <button style={{ padding: '6px 12px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px' }}>
              Omiljene serije
            </button>
          </Link>
        </div>
      </div>

      <h1>{show.name}</h1>
      <FavoriteButton show={show} />
      <img src={show.image?.original} alt={show.name} style={{ maxWidth: '300px', borderRadius: '10px' }} />
      <p><strong>Žanrovi:</strong> {show.genres?.join(', ')}</p>
      <p><strong>Status:</strong> {show.status}</p>
      <p><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>

      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2>Opis</h2>
        <p dangerouslySetInnerHTML={{ __html: show.summary }} />
      </div>

      <div id="epizode" style={{ marginTop: '30px' }}>
        <h2>Sezone</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedSeason === season ? '2px solid #000' : '1px solid #ccc',
                background: selectedSeason === season ? '#eee' : '#fff',
                cursor: 'pointer'
              }}
            >
              Sezona {season}
            </button>
          ))}
        </div>

        <div>
          {epizodeZaSezonu.map(ep => (
            <div key={ep.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
              <strong>{ep.name}</strong> (Epizoda {ep.number}, Datum: {ep.airdate})
            </div>
          ))}
        </div>
      </div>

      <div id="glumci" style={{ marginTop: '30px' }}>
        <h2>Glumci</h2>
        <ul>
          {glumci.map(member => (
            <li key={member.person.id}>
              {member.person.name} kao {member.character.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
