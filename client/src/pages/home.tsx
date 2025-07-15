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
      '--primary': 'hsl(216, 79%, 16%)',
      '--background': 'hsl(0, 0%, 100%)',
      '--foreground': 'hsl(210, 6%, 21%)',
      '--accent': 'hsl(215, 96%, 32%)',
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
} as const

// Custom color palettes inspired by the screenshots
const COLOR_PALETTES = [
  {
    name: 'Ocean Breeze',
    colors: ['#5F8A8B', '#A9C9A4', '#C7D6D5', '#E8F5E8'],
    theme: {
      '--primary': 'hsl(183, 20%, 45%)',
      '--background': 'hsl(120, 20%, 96%)',
      '--foreground': 'hsl(180, 15%, 20%)',
      '--accent': 'hsl(115, 25%, 65%)',
      '--muted': 'hsl(150, 15%, 85%)'
    }
  },
  {
    name: 'Forest Earth',
    colors: ['#4A5D23', '#8B956D', '#C9CBA3', '#F4F3D6'],
    theme: {
      '--primary': 'hsl(75, 45%, 25%)',
      '--background': 'hsl(60, 35%, 94%)',
      '--foreground': 'hsl(70, 40%, 15%)',
      '--accent': 'hsl(80, 25%, 55%)',
      '--muted': 'hsl(65, 20%, 80%)'
    }
  },
  {
    name: 'Sunset Warmth',
    colors: ['#8B4513', '#CD853F', '#F4A460', '#FFF8DC'],
    theme: {
      '--primary': 'hsl(25, 75%, 32%)',
      '--background': 'hsl(55, 100%, 95%)',
      '--foreground': 'hsl(30, 70%, 20%)',
      '--accent': 'hsl(28, 87%, 67%)',
      '--muted': 'hsl(40, 60%, 85%)'
    }
  },
  {
    name: 'Purple Dreams',
    colors: ['#4B0082', '#8A2BE2', '#DA70D6', '#E6E6FA'],
    theme: {
      '--primary': 'hsl(275, 100%, 25%)',
      '--background': 'hsl(240, 67%, 94%)',
      '--foreground': 'hsl(280, 90%, 15%)',
      '--accent': 'hsl(282, 71%, 65%)',
      '--muted': 'hsl(250, 40%, 85%)'
    }
  },
  {
    name: 'Mint Fresh',
    colors: ['#2E8B57', '#90EE90', '#98FB98', '#F0FFF0'],
    theme: {
      '--primary': 'hsl(146, 50%, 36%)',
      '--background': 'hsl(120, 100%, 97%)',
      '--foreground': 'hsl(150, 45%, 20%)',
      '--accent': 'hsl(120, 73%, 75%)',
      '--muted': 'hsl(135, 25%, 85%)'
    }
  },
  {
    name: 'Navy Steel',
    colors: ['#2F4F4F', '#5F9EA0', '#B0C4DE', '#F0F8FF'],
    theme: {
      '--primary': 'hsl(180, 25%, 25%)',
      '--background': 'hsl(208, 100%, 97%)',
      '--foreground': 'hsl(185, 20%, 15%)',
      '--accent': 'hsl(182, 25%, 63%)',
      '--muted': 'hsl(190, 30%, 80%)'
    }
  },
  {
    name: 'Coral Reef',
    colors: ['#FF7F50', '#FFA07A', '#FFB6C1', '#FFF0F5'],
    theme: {
      '--primary': 'hsl(16, 100%, 66%)',
      '--background': 'hsl(340, 100%, 97%)',
      '--foreground': 'hsl(20, 80%, 25%)',
      '--accent': 'hsl(17, 100%, 74%)',
      '--muted': 'hsl(350, 50%, 88%)'
    }
  },
  {
    name: 'Autumn Leaves',
    colors: ['#8B4513', '#D2691E', '#F4A460', '#FFEFD5'],
    theme: {
      '--primary': 'hsl(25, 75%, 32%)',
      '--background': 'hsl(36, 100%, 93%)',
      '--foreground': 'hsl(30, 70%, 20%)',
      '--accent': 'hsl(33, 82%, 53%)',
      '--muted': 'hsl(40, 60%, 85%)'
    }
  },
  {
    name: 'Berry Bliss',
    colors: ['#8B008B', '#DA70D6', '#FFB6C1', '#FFF0F5'],
    theme: {
      '--primary': 'hsl(300, 100%, 27%)',
      '--background': 'hsl(340, 100%, 97%)',
      '--foreground': 'hsl(310, 90%, 20%)',
      '--accent': 'hsl(302, 71%, 65%)',
      '--muted': 'hsl(320, 50%, 85%)'
    }
  },
  {
    name: 'Sky Blue',
    colors: ['#4682B4', '#87CEEB', '#E0F6FF', '#F0F8FF'],
    theme: {
      '--primary': 'hsl(207, 44%, 49%)',
      '--background': 'hsl(208, 100%, 97%)',
      '--foreground': 'hsl(210, 40%, 20%)',
      '--accent': 'hsl(203, 77%, 72%)',
      '--muted': 'hsl(200, 30%, 85%)'
    }
  },
  {
    name: 'Golden Hour',
    colors: ['#B8860B', '#FFD700', '#FFFFE0', '#FFFACD'],
    theme: {
      '--primary': 'hsl(43, 89%, 38%)',
      '--background': 'hsl(60, 100%, 94%)',
      '--foreground': 'hsl(45, 85%, 25%)',
      '--accent': 'hsl(51, 100%, 50%)',
      '--muted': 'hsl(55, 45%, 80%)'
    }
  },
  {
    name: 'Rose Garden',
    colors: ['#CD5C5C', '#F08080', '#FFE4E1', '#FFF5EE'],
    theme: {
      '--primary': 'hsl(0, 53%, 58%)',
      '--background': 'hsl(25, 100%, 96%)',
      '--foreground': 'hsl(5, 50%, 25%)',
      '--accent': 'hsl(0, 79%, 72%)',
      '--muted': 'hsl(15, 40%, 85%)'
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
      const hslValue = currentTheme[`--${varName}` as keyof typeof currentTheme]
      
      if (!hslValue) return '#000000'
      
      // Convert HSL to HEX
      const hslMatch = hslValue.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
      if (!hslMatch) return '#000000'
      
      const h = parseInt(hslMatch[1]) / 360
      const s = parseInt(hslMatch[2]) / 100
      const l = parseInt(hslMatch[3]) / 100
      
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      
      let r, g, b
      if (s === 0) {
        r = g = b = l
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
      }
      
      const toHex = (c: number) => {
        const hex = Math.round(c * 255).toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`
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
              src={logoPath} 
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <ColorSwatch name="Primary" cssVar="--primary" />
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
