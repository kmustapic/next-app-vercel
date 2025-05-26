'use client'
import { useEffect, useState } from 'react'

/*
funkcija FavoriteButton kao props prima objekt koji sadrzi:
- objekt show, koji sadrzi informacije za pojedinu seriju
- mini vrijednost, koja sluzi za probjeru velicine koristenog ekrana
   - ako je false prikazuje se klasicni gumb
   - ako je true prikazuje se mala ikona srca 
*/ 
export default function FavoriteButton({ show, mini = false }) {
  const [favorites, setFavorites] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  // Dohvatimo favorite iz localStorage kad se komponenta ucita
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
    setIsFavorite(stored.some(fav => fav.id === show.id))
  }, [show.id])

  // Funkcija za dodavanje/uklanjanje iz favorita
  const toggleFavorite = (e) => {
    if (e) e.stopPropagation()
    let updated = []
    if (isFavorite) {
      updated = favorites.filter(fav => fav.id !== show.id)
    } else {
      updated = [...favorites, show]
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setFavorites(updated)
    setIsFavorite(!isFavorite)
  }

  // ako je mini prikaz (za grid serija) — emoji srce
  if (mini) {
    return (
      <button onClick={toggleFavorite} className="text-2xl bg-transparent border-none cursor-pointer">
        {isFavorite ? '❤️' : '🤍'}
      </button>
    )
  }

  // inace, klasicni gumb za detalje serije
  return (
    <button
      onClick={toggleFavorite}
      className={`mt-2 px-4 py-2 rounded-lg text-white ${
        isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isFavorite ? 'Ukloni iz favorita' : 'Dodaj u favorite'}
    </button>
  )
}
