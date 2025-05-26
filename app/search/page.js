'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

export default function SearchPage() {
//inicjalizacija stanja
  const [allShows, setAllShows] = useState([])
  const [visibleShows, setVisibleShows] = useState([])
  const [limit, setLimit] = useState(20)

  /*
  fetch-amo podatke s API-a, sortiramo serije od najbolje do najgore ocjenjenih,
  useEffect() se izvrsava samo jednom jer imamo kao 2. argument prazan dependency array [], 
  kod mount-anja
  */ 
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

  /*
  azuriramo prikaz svaki put kad se 
  ili promjeni limit (max broj prikazanih serija u tom trenutku)
  ili promjeni allShows (npr. dodane nove serije),
  zato se obe varijable stanja nalaze u dependency array-u,
  promjenom bilo koje od njih pokrece se novo renderiranje

  postavljenim uvjetom gumb za 'ucitaj jos serija' se prikazuje 
  samo ako vrijedi uvjet da vec nisu ucitane/prikazane TV serije
  */ 
  useEffect(() => {
    setVisibleShows(allShows.slice(0, limit))
  }, [limit, allShows])

  const ucitajJos = () => {
    setLimit(prev => prev + 20)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">TV serije</h1>
        <div className="flex gap-3">
          <Link href="/favorites">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Omiljene serije
            </button>
          </Link>
          <Link href="/search">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Pretraga
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {visibleShows.map(show => (
          <div key={show.id} className="bg-[#593939] p-4 rounded-xl shadow-md relative hover:scale-105 transition-transform">
            <Link href={`/show/${show.id}`}>
              <div>
                <img src={show.image?.medium} alt={show.name} className="w-full rounded-md" />
                <h2 className="text-lg font-semibold mt-2">{show.name}</h2>
                <p className="text-sm text-[#e2dcdc]"><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>
              </div>
            </Link>
            <div className="absolute top-2 right-2">
              <FavoriteButton show={show} mini={true} />
            </div>
          </div>
        ))}
      </div>

      {visibleShows.length < allShows.length && (
        <div className="text-center mt-8">
          <button
            onClick={ucitajJos}
            className="px-6 py-2 text-lg bg-white text-[#704a4a] rounded-lg shadow hover:bg-gray-200"
          >
            Učitaj još serija
          </button>
        </div>
      )}
    </div>
  )
}
