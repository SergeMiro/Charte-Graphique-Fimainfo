import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
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

const THEMES = {
  sam: {
    label: 'SAM',
    vars: {
      '--primary': '#0052CC',
      '--secondary': '#172B4D',
      '--background': '#ffffff',
      '--foreground': '#3a4a6b',
      '--accent': '#1e40af',
      '--muted': '#dedede'
    }
  },
  dark: {
    label: 'Business Dark',
    vars: {
      '--primary': '#003366',
      '--secondary': '#004080',
      '--background': '#1a2a3a',
      '--foreground': '#ffffff',
      '--accent': '#c0c0c0',
      '--muted': '#3c4a5a'
    }
  },
  accent: {
    label: 'Accent Light',
    vars: {
      '--primary': '#b3c7d6',
      '--secondary': '#c0d0e0',
      '--background': '#d6e4f0',
      '--foreground': '#3a4a6b',
      '--accent': '#c0c0c0',
      '--muted': '#e0e8f0'
    }
  }
} as const

// Custom color palettes inspired by the screenshots
const COLOR_PALETTES = [
  {
    name: 'Ocean Breeze',
    colors: ['#5F8A8B', '#A9C9A4', '#C7D6D5', '#E8F5E8'],
    theme: {
      '--primary': '#5F8A8B',
      '--secondary': '#7A9B9C',
      '--background': '#E8F5E8',
      '--foreground': '#2C4A4B',
      '--accent': '#A9C9A4',
      '--muted': '#C7D6D5'
    }
  },
  {
    name: 'Forest Earth',
    colors: ['#4A5D23', '#8B956D', '#C9CBA3', '#F4F3D6'],
    theme: {
      '--primary': '#4A5D23',
      '--secondary': '#6B7A3A',
      '--background': '#F4F3D6',
      '--foreground': '#2A3515',
      '--accent': '#8B956D',
      '--muted': '#C9CBA3'
    }
  },
  {
    name: 'Sunset Warmth',
    colors: ['#8B4513', '#CD853F', '#F4A460', '#FFF8DC'],
    theme: {
      '--primary': '#8B4513',
      '--secondary': '#A0571F',
      '--background': '#FFF8DC',
      '--foreground': '#4A2409',
      '--accent': '#CD853F',
      '--muted': '#F4A460'
    }
  },
  {
    name: 'Purple Dreams',
    colors: ['#4B0082', '#8A2BE2', '#DA70D6', '#E6E6FA'],
    theme: {
      '--primary': '#4B0082',
      '--secondary': '#6A1BA2',
      '--background': '#E6E6FA',
      '--foreground': '#2A0049',
      '--accent': '#8A2BE2',
      '--muted': '#DA70D6'
    }
  },
  {
    name: 'Mint Fresh',
    colors: ['#2E8B57', '#90EE90', '#98FB98', '#F0FFF0'],
    theme: {
      '--primary': '#2E8B57',
      '--secondary': '#4A9B6E',
      '--background': '#F0FFF0',
      '--foreground': '#1A5233',
      '--accent': '#90EE90',
      '--muted': '#98FB98'
    }
  },
  {
    name: 'Navy Steel',
    colors: ['#2F4F4F', '#5F9EA0', '#B0C4DE', '#F0F8FF'],
    theme: {
      '--primary': '#2F4F4F',
      '--secondary': '#456565',
      '--background': '#F0F8FF',
      '--foreground': '#1A2E2E',
      '--accent': '#5F9EA0',
      '--muted': '#B0C4DE'
    }
  },
  {
    name: 'Coral Reef',
    colors: ['#FF7F50', '#FFA07A', '#FFB6C1', '#FFF0F5'],
    theme: {
      '--primary': '#FF7F50',
      '--secondary': '#FF9570',
      '--background': '#FFF0F5',
      '--foreground': '#8B4513',
      '--accent': '#FFA07A',
      '--muted': '#FFB6C1'
    }
  },
  {
    name: 'Autumn Leaves',
    colors: ['#8B4513', '#D2691E', '#F4A460', '#FFEFD5'],
    theme: {
      '--primary': '#8B4513',
      '--secondary': '#A0571F',
      '--background': '#FFEFD5',
      '--foreground': '#4A2409',
      '--accent': '#D2691E',
      '--muted': '#F4A460'
    }
  },
  {
    name: 'Berry Bliss',
    colors: ['#8B008B', '#DA70D6', '#FFB6C1', '#FFF0F5'],
    theme: {
      '--primary': '#8B008B',
      '--secondary': '#A020A0',
      '--background': '#FFF0F5',
      '--foreground': '#4A004A',
      '--accent': '#DA70D6',
      '--muted': '#FFB6C1'
    }
  },
  {
    name: 'Sky Blue',
    colors: ['#4682B4', '#87CEEB', '#E0F6FF', '#F0F8FF'],
    theme: {
      '--primary': '#4682B4',
      '--secondary': '#5A96C4',
      '--background': '#F0F8FF',
      '--foreground': '#2A4A6A',
      '--accent': '#87CEEB',
      '--muted': '#E0F6FF'
    }
  },
  {
    name: 'Golden Hour',
    colors: ['#B8860B', '#FFD700', '#FFFFE0', '#FFFACD'],
    theme: {
      '--primary': '#B8860B',
      '--secondary': '#C8960B',
      '--background': '#FFFACD',
      '--foreground': '#6B4E06',
      '--accent': '#FFD700',
      '--muted': '#FFFFE0'
    }
  },
  {
    name: 'Rose Garden',
    colors: ['#CD5C5C', '#F08080', '#FFE4E1', '#FFF5EE'],
    theme: {
      '--primary': '#CD5C5C',
      '--secondary': '#D76C6C',
      '--background': '#FFF5EE',
      '--foreground': '#7A3434',
      '--accent': '#F08080',
      '--muted': '#FFE4E1'
    }
  }
]

type ThemeKey = keyof typeof THEMES
type CustomPalette = typeof COLOR_PALETTES[0]

export default function Home() {
  const [theme, setTheme] = useState<ThemeKey>('sam')
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv'>('mobile')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [customTheme, setCustomTheme] = useState<CustomPalette | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const vars = customTheme ? customTheme.theme : THEMES[theme].vars
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [theme, customTheme])

  const applyCustomPalette = (palette: CustomPalette) => {
    setCustomTheme(palette)
    setShowColorPicker(false)
  }

  const resetToStandardTheme = (themeKey: ThemeKey) => {
    setCustomTheme(null)
    setTheme(themeKey)
  }

  const ThemeSelect = () => (
    <div className="flex flex-col gap-2">
      {Object.entries(THEMES).map(([key, t]) => (
        <Button
          key={key}
          variant={theme === key && !customTheme ? 'default' : 'outline'}
          size="sm"
          onClick={() => resetToStandardTheme(key as ThemeKey)}
          className="text-xs px-3 py-1 h-8 justify-start"
        >
          {t.label}
        </Button>
      ))}
      
      {/* My Colors Button */}
      <div className="relative">
        <Button
          variant={customTheme ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="text-xs px-3 py-1 h-8 justify-start w-full"
        >
          My colors
          <ChevronDownIcon className="w-3 h-3 ml-auto" />
        </Button>
        
        {/* Color Palette Dropdown */}
        {showColorPicker && (
          <>
            {/* Overlay to close on outside click */}
            <div 
              className="color-palette-overlay"
              onClick={() => setShowColorPicker(false)}
            />
            <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-lg color-palette-dropdown p-3 z-50 w-auto">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-foreground">Color Palettes</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-1 max-h-64 overflow-y-auto overflow-x-hidden">
                {COLOR_PALETTES.map((palette, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group color-palette-item p-1 rounded-md hover:bg-muted/50 transition-colors"
                    onClick={() => applyCustomPalette(palette)}
                  >
                    <div className="flex items-center justify-between">
                      {/* Color circles */}
                      <div className="flex gap-1.5">
                        {palette.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-5 h-5 rounded-full border border-border/30 color-circle"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Close button */}
              <div className="flex justify-end mt-3 pt-3 border-t border-border">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowColorPicker(false)}
                  className="text-xs px-3 py-1 h-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const ColorSwatch = ({
    name,
    cssVar
  }: {
    name: string
    cssVar: string
  }) => {
    const getHexColor = (cssVar: string) => {
      const currentTheme = customTheme ? customTheme.theme : THEMES[theme].vars
      const varName = cssVar.replace('--', '')
      const hexValue = currentTheme[`--${varName}` as keyof typeof currentTheme]
      
      return hexValue || '#000000'
    }
    
    return (
      <div className="flex flex-col items-center gap-1 text-xs">
        <div
          className="w-16 h-16 rounded-lg border"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
        <span className="font-mono">{name}</span>
        <span className="font-mono text-muted-foreground text-xs">{getHexColor(cssVar)}</span>
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
      <header className="py-6 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider flex items-center">
          FIM
          <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white rounded-md mx-1 shadow-sm border">
            <img
              src={typeof logoPath === 'string' ? logoPath : logoPath.src}
              alt="FIMA1NFO Logo"
              className="w-6 h-6 md:w-7 md:h-7 object-contain"
            />
          </span>
          1NFO
        </h1>
        <ThemeSelect />
      </header>

      <Section title="Typographie">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-primary">
            Police principale : Inter – fallback : sans-serif
          </p>
          <p className="text-sm text-muted-foreground font-secondary">
            Police secondaire : Merriweather – fallback : serif
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" cssVar="--primary" />
          <ColorSwatch name="Secondary" cssVar="--secondary" />
          <ColorSwatch name="Background" cssVar="--background" />
          <ColorSwatch name="Foreground" cssVar="--foreground" />
          <ColorSwatch name="Accent" cssVar="--accent" />
          <ColorSwatch name="Muted" cssVar="--muted" />
        </div>
      </Section>

      <Section title="Boutons">
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" className="text-xs px-3 py-1 h-8">Primary</Button>
          <Button size="sm" variant="secondary" className="text-xs px-3 py-1 h-8">Secondary</Button>
          <Button size="sm" disabled className="text-xs px-3 py-1 h-8">Disabled</Button>
          <Button size="sm" className="text-xs px-3 py-1 h-8">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Loading
          </Button>
          <Button size="sm" variant="destructive" className="text-xs px-3 py-1 h-8">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Button>
          <Button size="sm" className="btn-success text-xs px-3 py-1 h-8">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
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
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Succès ! Données enregistrées</span>
          </div>
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <XCircle className="w-4 h-4" />
            <span>Erreur : impossible de charger</span>
          </div>
          <div className="flex items-start gap-2">
            <InformationCircleIcon className="w-4 h-4 text-accent mt-0.5" />
            <span className="text-sm italic text-accent">
              Aucun résultat trouvé.
            </span>
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
                  onClick={() => setActiveDevice('mobile')}
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
                  onClick={() => setActiveDevice('tablet')}
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
                  onClick={() => setActiveDevice('laptop')}
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
                  onClick={() => setActiveDevice('desktop')}
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
                  onClick={() => setActiveDevice('tv')}
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
            <h3 className="text-lg font-medium">Badges et étiquettes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Nouveau</Badge>
              <Badge variant="secondary">En cours</Badge>
              <Badge variant="destructive">Urgent</Badge>
              <Badge className="bg-green-600 hover:bg-green-700 text-white">Terminé</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Commutateurs</h3>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <label htmlFor="notifications" className="text-sm">Notifications activées</label>
            </div>
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
        © 2025 FIMA1NFO – Charte graphique démonstrative.
      </footer>
    </main>
  )
}
