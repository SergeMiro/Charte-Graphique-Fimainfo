'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Tablet, Laptop, Monitor, Tv, Palette, Type, Layout, Layers, Check } from 'lucide-react'
import Image from 'next/image'

const THEMES = {
  sam: {
    label: 'SAM Light',
    vars: {
      '--primary': 'hsl(210, 11%, 71%)',
      '--background': 'hsl(0, 0%, 98%)',
      '--foreground': 'hsl(206, 13%, 27%)',
      '--accent': 'hsl(217, 91%, 60%)',
      '--muted': 'hsl(0, 0%, 87%)'
    }
  },
  dark: {
    label: 'Business Dark',
    vars: {
      '--primary': 'hsl(206, 100%, 17%)',
      '--background': 'hsl(229, 24%, 12%)',
      '--foreground': 'hsl(0, 0%, 100%)',
      '--accent': 'hsl(300, 2%, 78%)',
      '--muted': 'hsl(236, 11%, 27%)'
    }
  },
  accent: {
    label: 'Accent Light',
    vars: {
      '--primary': 'hsl(210, 11%, 71%)',
      '--background': 'hsl(210, 17%, 98%)',
      '--foreground': 'hsl(210, 10%, 23%)',
      '--accent': 'hsl(300, 2%, 78%)',
      '--muted': 'hsl(210, 14%, 89%)'
    }
  }
}

type ThemeKey = keyof typeof THEMES

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('sam')

  const applyTheme = (theme: ThemeKey) => {
    const root = document.documentElement
    const themeVars = THEMES[theme].vars
    
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    // Remove all theme classes and add the current one
    root.className = root.className.replace(/theme-\w+/g, '')
    root.classList.add(`theme-${theme}`)
    
    setCurrentTheme(theme)
  }

  useEffect(() => {
    applyTheme('sam')
  }, [])

  const breakpoints = [
    { icon: Smartphone, label: 'Mobile', size: '< 768px', tooltip: 'Smartphone' },
    { icon: Tablet, label: 'Tablet', size: '768px - 1024px', tooltip: 'Tablette' },
    { icon: Laptop, label: 'Laptop', size: '1024px - 1440px', tooltip: 'Ordinateur portable' },
    { icon: Monitor, label: 'Desktop', size: '1440px - 1920px', tooltip: 'Ordinateur de bureau' },
    { icon: Tv, label: 'Large', size: '> 1920px', tooltip: 'Grand écran' }
  ]

  const colorPalette = [
    { name: 'Primary', var: '--primary', hex: currentTheme === 'sam' ? '#c5c3c6' : currentTheme === 'dark' ? '#002855' : '#c5c3c6' },
    { name: 'Background', var: '--background', hex: currentTheme === 'sam' ? '#fafafa' : currentTheme === 'dark' ? '#1a1d23' : '#f8f9fb' },
    { name: 'Foreground', var: '--foreground', hex: currentTheme === 'sam' ? '#343a40' : currentTheme === 'dark' ? '#ffffff' : '#3a3e42' },
    { name: 'Accent', var: '--accent', hex: currentTheme === 'sam' ? '#4f9cf9' : '#c5c3c6' },
    { name: 'Muted', var: '--muted', hex: currentTheme === 'sam' ? '#dedede' : currentTheme === 'dark' ? '#404040' : '#e8eaed' }
  ]

  return (
    <div className="min-h-screen bg-background transition-all duration-300 theme-wrapper">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl font-bold text-foreground flex items-center gap-2">
              FIM
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Image
                  src="/icon_fimainfo_1752137499908.png"
                  alt="FIMA1NFO Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              1NFO
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">Charte graphique & Système de design</p>
          
          {/* Theme Switcher */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="text-sm text-muted-foreground mr-2">Thème:</span>
            {Object.entries(THEMES).map(([key, theme]) => (
              <Button
                key={key}
                variant={currentTheme === key ? "default" : "outline"}
                size="sm"
                onClick={() => applyTheme(key as ThemeKey)}
                className="px-3 py-1 h-8 text-xs hover:bg-muted transition-colors"
              >
                {theme.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Typography Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typographie
              </CardTitle>
              <CardDescription>Hiérarchie et styles de texte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Titre Principal</h1>
                <h2 className="text-3xl font-semibold text-foreground mb-2">Sous-titre</h2>
                <h3 className="text-2xl font-medium text-foreground mb-2">Titre Section</h3>
                <h4 className="text-xl font-medium text-foreground mb-4">Titre Composant</h4>
                <p className="text-base text-foreground mb-2">Texte de paragraphe standard avec une longueur normale pour la lecture.</p>
                <p className="text-sm text-muted-foreground">Texte secondaire ou informations complémentaires.</p>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Couleurs
              </CardTitle>
              <CardDescription>Palette de couleurs du thème</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {colorPalette.map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border border-border flex-shrink-0"
                      style={{ backgroundColor: `hsl(var(${color.var}))` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoints Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Points de rupture responsive
            </CardTitle>
            <CardDescription>Adaptation aux différentes tailles d'écran</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {breakpoints.map((breakpoint, index) => {
                const Icon = breakpoint.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors group"
                    title={breakpoint.tooltip}
                  >
                    <Icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-medium text-foreground mb-1">{breakpoint.label}</h3>
                    <p className="text-xs text-muted-foreground text-center">{breakpoint.size}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* UI Components Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Composants UI
            </CardTitle>
            <CardDescription>Éléments d'interface utilisateur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Buttons */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-foreground">Boutons</h4>
                <div className="space-y-3">
                  <Button className="w-full">Bouton Principal</Button>
                  <Button variant="outline" className="w-full">Bouton Secondaire</Button>
                  <Button variant="ghost" className="w-full">Bouton Fantôme</Button>
                </div>
              </div>

              {/* Form Elements */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-foreground">Formulaires</h4>
                <div className="space-y-3">
                  <Input placeholder="Champ de saisie" />
                  <div className="flex items-center space-x-2">
                    <Switch id="switch-demo" />
                    <label htmlFor="switch-demo" className="text-sm text-foreground">Interrupteur</label>
                  </div>
                </div>
              </div>

              {/* Badges and Status */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-foreground">État & Badges</h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Par défaut</Badge>
                    <Badge variant="secondary">Secondaire</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check className="w-3 h-3 mr-1" />
                      Terminé
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}