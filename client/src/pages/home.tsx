import React, { useState, useEffect, useCallback } from 'react'
import { useButtonHandler } from '@/hooks/useButtonHandler'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Loader2, CheckCircle, XCircle, CalendarIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  InformationCircleIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  EnvelopeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  TvIcon,
  ChevronDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import logoPath from '@assets/icon_fimainfo_1752137499908.png'
import { SubscriptionDate, ScheduleDate, DropdownSelect, SelectDemo } from '@/components/date'
import { ComboboxDemo } from '@/components/ui/combobox'
import { AvatarDemo } from '@/components/ui/avatar-demo'
import { DropdownMenuDemo } from '@/components/ui/dropdown-menu-demo'
import { DialogDemo } from '@/components/ui/dialog-demo'
import { AlertDialogDemo } from '@/components/ui/alert-dialog-demo'
import { ToastDemo } from '@/components/ui/toast-demo'
import { Toaster } from '@/components/ui/toaster'
import { FilterableTable } from '@/components/ui/filterable-table'


// Theme definitions moved to index.css
const THEMES = {
  sam: { label: 'SAM' },
  dark: { label: 'Dark' },
  accent: { label: 'Light' }
} as const

type ThemeKey = keyof typeof THEMES

export default function Home() {
  const [theme, setTheme] = useState<ThemeKey>('sam')
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv'>('mobile')
  const { handleButtonClick } = useButtonHandler()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme === 'sam' ? '' : theme)
  }, [theme])

  const resetToStandardTheme = (themeKey: ThemeKey) => {
    setTheme(themeKey)
  }

  const ThemeSelect = () => (
    <div className="flex flex-col gap-2">
      {Object.entries(THEMES).map(([key, t]) => (
        <Button
          key={key}
          variant="empty"
          size="sm"
          onClick={() => resetToStandardTheme(key as ThemeKey)}
          className={`text-xs px-8 py-1 h-8 justify-start ${
            theme === key ? 'bg-primary text-white border-primary' : ''
          }`}
        >
          {t.label}
        </Button>
      ))}
    </div>
  )

  const ColorSwatch = ({
    name,
    cssVar
  }: {
    name: string
    cssVar: string
  }) => {
    const [hexColor, setHexColor] = useState<string>('#000000')

    // Fonction pour obtenir la valeur hexadécimale actuelle de la variable CSS
    const getHexColor = useCallback((cssVar: string) => {
      // Get computed color value from CSS variable
      const computedStyle = getComputedStyle(document.documentElement)
      return computedStyle.getPropertyValue(cssVar.replace('var(', '').replace(')', '')) || '#000000'
    }, [])

    // Mettre à jour la valeur hexadécimale lorsque le thème change
    useEffect(() => {
      // Mise à jour initiale
      setHexColor(getHexColor(cssVar))

      // Observer pour les changements de thème
      const observer = new MutationObserver(() => {
        setHexColor(getHexColor(cssVar))
      })

      // Observer les changements d'attributs (comme les classes de thème) sur le document
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
      })

      return () => observer.disconnect()
    }, [cssVar, getHexColor])

    return (
      <div className="flex flex-col items-center gap-1 text-xs">
        <div
          className="w-16 h-16 rounded-lg border"
          style={{ backgroundColor: cssVar.startsWith('--') ? `var(${cssVar})` : hexColor }}
        />
        <span className="font-mono">{name}</span>
        <span className="font-mono text-muted-foreground text-xs">{hexColor}</span>
      </div>
    )
  }

  const Section = ({
    title,
    children
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <section className="py-8 border-b last:border-b-0 border-muted">
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )

  return (
    <main className="px-4 md:px-10 max-w-5xl mx-auto font-primary transition-colors">
      <Toaster />
      <header className="py-6 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <div className="w-full" ref={(el) => {
            if (el) {
              const logoWidth = document.getElementById('main-logo')?.getBoundingClientRect().width;
              if (logoWidth) {
                const extranetDiv = el.querySelector('.extranet-text') as HTMLElement;
                if (extranetDiv) {
                  extranetDiv.style.width = `${logoWidth}px`;
                }
              }
            }
          }}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider flex items-center" id="main-logo">
              FIM
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-9 bg-white rounded-md mx-1 shadow-sm border">
                <img
                  src={typeof logoPath === 'string' ? logoPath : logoPath.src}
                  alt="FIMA1NFO Logo"
                  className="w-6 h-6 md:w-7 md:h-7 object-contain"
                />
              </span>
              1NFO
            </h1>
            <div className="flex w-full mt-1">
              <div className="extranet-text text-sm font-light text-foreground w-full flex justify-between px-1" style={{ letterSpacing: '0.05em' }}>
                <span className="text-center">E</span>
                <span className="text-center">X</span>
                <span className="text-center">T</span>
                <span className="text-center">R</span>
                <span className="text-center">A</span>
                <span className="text-center">N</span>
                <span className="text-center">E</span>
                <span className="text-center">T</span>
              </div>
            </div>
          </div>
        </div>
        <ThemeSelect />
      </header>



      <Section title="Typographie">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-primary">
            Police principale : Open Sans – fallback : sans-serif
          </p>
          <p className="text-sm text-muted-foreground font-secondary">
            Police secondaire : Montserrat – fallback : sans-serif
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold font-primary">
            Titre niveau 1 / h1
          </h1>
          <h2 className="text-3xl font-semibold font-primary">
            Titre niveau 2 / h2
          </h2>
          <h3 className="text-2xl font-medium font-primary">
            Sous-titre / h3
          </h3>
          <p className="text-base leading-relaxed font-primary">
            Corps de texte principal : Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p className="text-base leading-relaxed font-secondary">
            Exemple de texte en police secondaire pour montrer le
            contraste visuel du style.
          </p>

        </div>
      </Section>

      <Section title="Palette de couleurs – thème actuel">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
          <ColorSwatch name="Primary" cssVar="--primary" />
          <ColorSwatch name="Secondary" cssVar="--secondary" />
          <ColorSwatch name="Background" cssVar="--background" />
          <ColorSwatch name="Foreground" cssVar="--foreground" />
          <ColorSwatch name="Destructive" cssVar="--destructive" />
          <ColorSwatch name="Success" cssVar="--success" />
          <ColorSwatch name="Alarm" cssVar="--alarm" />
          <ColorSwatch name="Muted" cssVar="--muted" />
        </div>
      </Section>

      <Section title="Boutons">
        {/* First row - Standard size buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" className="btn-empty border border-primary text-primary hover:bg-primary hover:text-white text-xs px-3 py-1 h-8">Empty</Button>
          <Button size="sm" className="btn-primary text-xs px-3 py-1 h-8">Primary</Button>
          <Button size="sm" className="btn-secondary text-xs px-3 py-1 h-8">Secondary</Button>
          <Button size="sm" disabled className="text-xs px-3 py-1 h-8 bg-muted text-gray-900 border border-muted">Disabled</Button>
          <Button size="sm" className="btn-primary text-xs px-3 py-1 h-8">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Loading
          </Button>
          <Button size="sm" className="btn-destructive text-xs px-3 py-1 h-8">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Button>
          <Button size="sm" className="btn-success text-xs px-3 py-1 h-8">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Button>
          <Button size="sm" className="btn-alarm text-xs px-3 py-1 h-8">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Warning
          </Button>
        </div>
        
        {/* Second row - Medium size buttons */}
        <div className="flex flex-wrap gap-2 items-center mt-2">
        <Button size="sm" className="btn-empty border border-primary text-primary hover:bg-primary hover:text-white text-xs px-2 py-0.5 h-7">Empty</Button>
          <Button size="sm" className="btn-primary text-xs px-2 py-0.5 h-7">Primary</Button>
          <Button size="sm" className="btn-secondary text-xs px-2 py-0.5 h-7">Secondary</Button>
          <Button size="sm" disabled className="text-xs px-2 py-0.5 h-7 bg-muted text-gray-900 border border-muted">Disabled</Button>
          <Button size="sm" className="btn-primary text-xs px-2 py-0.5 h-7">
            <Loader2 className="w-2.5 h-2.5 mr-1 animate-spin" />
            Loading
          </Button>
          <Button size="sm" className="btn-destructive text-xs px-2 py-0.5 h-7">
            <XCircle className="w-2.5 h-2.5 mr-1" />
            Error
          </Button>
          <Button size="sm" className="btn-success text-xs px-2 py-0.5 h-7">
            <CheckCircle className="w-2.5 h-2.5 mr-1" />
            Success
          </Button>
          <Button size="sm" className="btn-alarm text-xs px-2 py-0.5 h-7">
            <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Warning
          </Button>
        </div>
        
        {/* Third row - Small size buttons */}
        <div className="flex flex-wrap gap-2 items-center mt-2">
        <Button size="sm" className="btn-empty border border-primary text-primary hover:bg-primary hover:text-white text-[10px] px-1.5 py-0 h-5">Empty</Button>

          <Button size="sm" className="btn-primary text-[10px] px-1.5 py-0 h-5">Primary</Button>
          <Button size="sm" className="btn-secondary text-[10px] px-1.5 py-0 h-5">Secondary</Button>
          <Button size="sm" disabled className="text-[10px] px-1.5 py-0 h-5 bg-muted text-gray-900 border border-muted">Disabled</Button>
          <Button size="sm" className="btn-primary text-[10px] px-1.5 py-0 h-5">
            <Loader2 className="w-2 h-2 mr-0.5 animate-spin" />
            Loading
          </Button>
          <Button size="sm" className="btn-destructive text-[10px] px-1.5 py-0 h-5">
            <XCircle className="w-2 h-2 mr-0.5" />
            Error
          </Button>
          <Button size="sm" className="btn-success text-[10px] px-1.5 py-0 h-5">
            <CheckCircle className="w-2 h-2 mr-0.5" />
            Success
          </Button>
          <Button size="sm" className="btn-alarm text-[10px] px-1.5 py-0 h-5">
            <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Warning
          </Button>
        </div>
      </Section>

      <Section title="Icônes Heroicons">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <InformationCircleIcon className="w-6 h-6" />
            <span className="text-xs">Info</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">User</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <Cog6ToothIcon className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="text-xs">Bell</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <EnvelopeIcon className="w-6 h-6" />
            <span className="text-xs">Mail</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <HeartIcon className="w-6 h-6" />
            <span className="text-xs">Heart</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <MagnifyingGlassIcon className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="text-xs">Cart</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground hover:text-gray-400 transition-colors">
            <StarIcon className="w-6 h-6" />
            <span className="text-xs">Star</span>
          </div>
        </div>
      </Section>

      <Section title="États & Feedback utilisateur">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Chargement…</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--destructive)' }}>
            <XCircle className="w-4 h-4" />
            <span>Erreur : impossible de charger</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--success)' }}>
            <CheckCircle className="w-4 h-4" />
            <span>Succès ! Données enregistrées</span>
          </div>
          <div className="flex items-start gap-2">
            <InformationCircleIcon className="w-4 h-4 text-primary mt-0.5" />
            <span className="text-sm italic text-primary">
              Aucun résultat trouvé.
            </span>
          </div>
        </div>
      </Section>



      <Section title="Composants d'interface">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Champs de saisie</h3>
            <div className="flex flex-wrap gap-3">
              <Input placeholder="Nom d'utilisateur" className="w-48" />
              <Input type="email" placeholder="Email" className="w-48" />
              <Input type="password" placeholder="Mot de passe" className="w-48" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Avatars</h3>
            <AvatarDemo />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Badges et étiquettes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Nouveau</Badge>
              <Badge variant="secondary">En cours</Badge>
              <Badge variant="alarm">Urgent</Badge>
              <Badge variant="success">Terminé</Badge>
              <Badge variant="destructive">Erreur</Badge>
              <Badge variant="blue">Information</Badge>
              <Badge variant="purple">En attente</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Commutateurs</h3>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <label htmlFor="notifications" className="text-sm">Notifications activées</label>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Sélecteurs de date</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
              <SubscriptionDate />
              <ScheduleDate />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Listes déroulantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
              <div className="flex flex-col gap-3">
                <label className="px-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select avec recherche</label>
                <ComboboxDemo />
              </div>
              <div className="flex flex-col gap-3">
                <label className="px-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select simple</label>
                <SelectDemo />
              </div>
            </div>
          </div>


          <div className="space-y-2">
            <h3 className="text-lg font-medium">Menus déroulants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <DropdownMenuDemo />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-medium">Dialogues</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <DialogDemo />
              <AlertDialogDemo />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-medium">Notifications Toast</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <ToastDemo />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-medium">Tableau filtrable</h3>
            <FilterableTable />
          </div>
        </div>
      </Section>

      <Section title="Responsive & Breakpoints">
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={activeDevice === 'mobile' ? 'default' : 'outline'}
                  onClick={(e) => handleButtonClick(() => setActiveDevice('mobile'), e)}
                  className="text-xs px-3 py-1 h-8 hover:text-gray-400 transition-colors"
                >
                  <DevicePhoneMobileIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Smartphone</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={activeDevice === 'tablet' ? 'default' : 'outline'}
                  onClick={(e) => handleButtonClick(() => setActiveDevice('tablet'), e)}
                  className="text-xs px-3 py-1 h-8 hover:text-gray-400 transition-colors"
                >
                  <DeviceTabletIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tablette</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={activeDevice === 'laptop' ? 'default' : 'outline'}
                  onClick={(e) => handleButtonClick(() => setActiveDevice('laptop'), e)}
                  className="text-xs px-3 py-1 h-8 hover:text-gray-400 transition-colors"
                >
                  <ComputerDesktopIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ordinateur portable</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={activeDevice === 'desktop' ? 'default' : 'outline'}
                  onClick={(e) => handleButtonClick(() => setActiveDevice('desktop'), e)}
                  className="text-xs px-3 py-1 h-8 hover:text-gray-400 transition-colors"
                >
                  <ComputerDesktopIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ordinateur de bureau</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={activeDevice === 'tv' ? 'default' : 'outline'}
                  onClick={(e) => handleButtonClick(() => setActiveDevice('tv'), e)}
                  className="text-xs px-3 py-1 h-8 hover:text-gray-400 transition-colors"
                >
                  <TvIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Télévision</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className={`
            grid gap-3 text-center text-sm font-medium
            ${activeDevice === 'mobile' ? 'grid-cols-1' : ''}
            ${activeDevice === 'tablet' ? 'grid-cols-2' : ''}
            ${activeDevice === 'laptop' ? 'grid-cols-3' : ''}
            ${activeDevice === 'desktop' ? 'grid-cols-4' : ''}
            ${activeDevice === 'tv' ? 'grid-cols-5' : ''}
          `}>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 1</div>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 2</div>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 3</div>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 4</div>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 5</div>
            <div className="p-6 bg-muted rounded-lg">Content Bloc 6</div>
          </div>
        </div>
      </Section>

      <Section title="Espacement et grille">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-muted rounded-lg text-center text-sm">
                Colonne {i}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="p-2 bg-muted rounded">Espacement XS (8px)</div>
            <div className="p-3 bg-muted rounded">Espacement SM (12px)</div>
            <div className="p-4 bg-muted rounded">Espacement MD (16px)</div>
            <div className="p-6 bg-muted rounded">Espacement LG (24px)</div>
          </div>
        </div>
      </Section>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        2025 FIMA1NFO – Charte graphique démonstrative.
      </footer>
    </main>
  )
}
