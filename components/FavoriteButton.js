'use client'
import { useEffect, useState } from 'react'

export default function FavoriteButton({ show, mini = false }) {
  const [favorites, setFavorites] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
    setIsFavorite(stored.some(fav => fav.id === show.id))
  }, [show.id])

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

  if (mini) {
    return (
      <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    )
  }

  return (
    <button
      onClick={toggleFavorite}
      style={{
        padding: '10px 16px',
        marginTop: '10px',
        backgroundColor: isFavorite ? '#e63946' : '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      {isFavorite ? 'Ukloni iz favorita' : 'Dodaj u favorite'}
    </button>
  )
}
