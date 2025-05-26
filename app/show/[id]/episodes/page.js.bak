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
    <div className="p-6">
      <div className="mb-4">
        <Link href={`/show/${id}`} className="text-blue-200 hover:underline">
          ← Povratak na detalje serije
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Epizode</h1>

      {episodes.length === 0 ? (
        <p>Učitavanje epizoda...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map(ep => (
            <div key={ep.id} className="bg-[#593939] p-4 rounded-lg shadow hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold mb-1">{ep.name}</h3>
              <p><strong>Sezona:</strong> {ep.season} | <strong>Ep:</strong> {ep.number}</p>
              <p><strong>Datum prikazivanja:</strong> {ep.airdate}</p>
              {ep.image?.medium && (
                <img src={ep.image.medium} alt={ep.name} className="w-full mt-3 rounded-md" />
              )}
              {ep.summary && (
                <p className="text-sm mt-2 text-[#e2dcdc]" dangerouslySetInnerHTML={{ __html: ep.summary }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
