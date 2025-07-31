import { useCallback } from 'react'

/**
 * Hook personnalisé pour gérer les événements de boutons de manière robuste
 * Empêche les problèmes de navigation/défilement sur Vercel
 */
export const useButtonHandler = () => {
  const handleButtonClick = useCallback((
    callback: () => void,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event) {
      // Empêche le comportement par défaut
      event.preventDefault()
      // Empêche la propagation de l'événement
      event.stopPropagation()
    }
    
    // Exécute le callback dans un setTimeout pour s'assurer
    // que tous les événements sont traités avant
    setTimeout(() => {
      callback()
    }, 0)
  }, [])

  return { handleButtonClick }
}
