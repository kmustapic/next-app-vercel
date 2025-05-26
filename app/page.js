// tek naknadna implementacija u daljnjem razvoju aplikacije 
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

export default function Home() {
  const [allShows, setAllShows] = useState([])
  const [visibleShows, setVisibleShows] = useState([])
  const [limit, setLimit] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')

  /*
  - kod useEffect-a, imamo kao 2. argument prazan dependency array,
  sto znaci da se funkcija poziva samo jednnom
  - serje sortirane od najbolje ocjene do najlosije ocjene
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
  - useEffect() koji se koristi za pretragu serija
  - pokrece se novo renderiranje svaki put kad se promjeni
  neka varijabla stanja iz dependency array-a 
  */
  useEffect(() => {
    const filtrirano = allShows.filter(show =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setVisibleShows(filtrirano.slice(0, limit))
  }, [limit, allShows, searchTerm])

  // prikaz novih dodatnih 20 serija
  const ucitajJos = () => {
    setLimit(prev => prev + 20)
  }

  // ucitavanje novih serija je moguce samo ako vec nisu izlistane sve serije 
  return (
    <div className="p-6">
      <h1 className="text-5xl sm:text-6xl font-bold text-center mb-10 text-grey">TV serije</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Pretraži serije..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 text-black"
        />
        <Link href="/favorites">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
            Omiljene serije
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleShows.map(show => (
          <div
            key={show.id}
            className="bg-[#593939] p-4 rounded-xl shadow-md relative hover:scale-105 transition-transform overflow-hidden shine-effect"
          >
            <Link href={`/show/${show.id}`}>
              <div>
                <img src={show.image?.medium} alt={show.name} className="rounded-lg w-full" />
                <h2 className="text-lg font-semibold mt-2 text-white">{show.name}</h2>
                <p className="text-sm text-[#e2dcdc]">Ocjena: {show.rating?.average || 'N/A'}</p>
              </div>
            </Link>
            <div className="absolute top-2 right-2">
              <FavoriteButton show={show} mini={true} />
            </div>
          </div>
        ))}
      </div>

      {visibleShows.length < allShows.filter(show => show.name.toLowerCase().includes(searchTerm.toLowerCase())).length && (
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
