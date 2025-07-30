"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function ToastDemo() {
  const { toast } = useToast()

  const showDefaultToast = () => {
    toast({
      title: "Notification",
      description: "Votre action a été effectuée avec succès.",
    })
  }

  const showDestructiveToast = () => {
    toast({
      variant: "destructive" as const,
      title: "Erreur",
      description: "Une erreur s'est produite lors de l'opération.",
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => console.log("Try again clicked")}
          className="h-8 border-white text-destructive hover:bg-destructive hover:text-white"
        >
          Try again
        </Button>
      ),
    })
  }

  return (
    <div className="flex gap-4">
      <Button variant="default" onClick={showDefaultToast}>
        Show Toast
      </Button>
      <Button 
        variant="default"
        onClick={showDestructiveToast}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        Show Error Toast
      </Button>
    </div>
  )
}
