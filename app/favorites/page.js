'use client'
// koristi se 'use client' zbog koristenja localStorage-a
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function FavoritesPage() {
  // Koristeci hook setState inicijaliziramo prazan array, u koji ce se dodavati odabrane omiljene serije
  const [favorites, setFavorites] = useState([])

  /* Koristeci hook useEffect, dohvacamo podatke iz local storage-a,
   u slucaju da vec inicijalno imamo neke odabrane omiljene serije,
   a za slucaj da nemamo odabrane serije pridruzuje se prazan array,
   fukcija se pokrece samo jednom jer imamo kao 2. argument, prazan dependency array[]
  */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
  }, [])

  /* 
  - link vodi natrag na pocetnu stranicu
  - preko logike ternarnog operatora (skracena if logika) provjeravamo slucaj
  ako je pocetna lista omiljenih serija prazna, tad se samo ispisuje odgovarajuca poruka,
  ako lista omiljenih serija nije prazna, onda se ona prikazuje (u obliku grid elementa)
  */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Omiljene serije</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Početna
          </button>
        </Link>
      </div>

      {favorites.length === 0 ? (
        <p className="text-[#e2dcdc] mt-4 italic">Trenutno nemate dodane omiljene serije.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {favorites.map(show => (
            <div key={show.id} className="bg-[#593939] p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
              <Link href={`/show/${show.id}`}>
                <div>
                  <img src={show.image?.medium} alt={show.name} className="w-full rounded-md mb-2" />
                  <h2 className="text-lg font-semibold">{show.name}</h2>
                  <p className="text-sm text-[#e2dcdc]"><strong>Ocjena:</strong> {show.rating?.average || 'N/A'}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
