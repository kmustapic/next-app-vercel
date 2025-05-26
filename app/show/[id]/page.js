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

  if (!show) return <div className="p-6">Učitavanje...</div>

  const epizodeZaSezonu = show._embedded?.episodes.filter(ep => ep.season === selectedSeason)
  const glumci = [...(show._embedded?.cast || [])].sort((a, b) => a.person.name.localeCompare(b.person.name))

  return (
    <div className="p-6">
      {/* Gornji izbornik */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-blue-200 hover:underline">← Povratak</Link>
        <div className="flex gap-4">
          <a href="#epizode" className="text-blue-200 hover:underline">Epizode</a>
          <a href="#glumci" className="text-blue-200 hover:underline">Glumci</a>
          <Link href="/favorites">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Omiljene serije
            </button>
          </Link>
        </div>
      </div>

      {/* Glavni podaci o seriji */}
      <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
      <FavoriteButton show={show} />
      <img src={show.image?.original} alt={show.name} className="w-full max-w-md rounded-xl my-4" />
      <p><strong>Žanrovi:</strong> {show.genres?.join(', ')}</p>
      <p><strong>Status:</strong> {show.status}</p>
      <p><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>

      {/* Opis */}
      <div className="mt-6 p-4 border border-gray-300 rounded-md bg-[#593939]">
        <h2 className="text-xl font-semibold mb-2">Opis</h2>
        <p dangerouslySetInnerHTML={{ __html: show.summary }} />
      </div>

      {/* Epizode po sezoni */}
      <div id="epizode" className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Sezone</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-2 rounded-full border ${
                selectedSeason === season
                  ? 'bg-white text-black font-bold'
                  : 'bg-transparent border-gray-300 text-white hover:bg-white hover:text-black'
              }`}
            >
              Sezona {season}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {epizodeZaSezonu.map(ep => (
            <div key={ep.id} className="border-b border-gray-300 pb-2">
              <strong>{ep.name}</strong> (Epizoda {ep.number}, Datum: {ep.airdate})
            </div>
          ))}
        </div>
      </div>

      {/* Glumci */}
      <div id="glumci" className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Glumci</h2>
        <ul className="space-y-1">
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
