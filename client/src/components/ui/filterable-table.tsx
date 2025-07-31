import React, { useState, useMemo } from 'react'
import { Input } from './input'
import { Button } from './button'
import { Badge } from './badge'
import { Checkbox } from './checkbox'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem 
} from './dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Search, ChevronLeft, ChevronRight, X, Settings, ChevronDown } from 'lucide-react'

// Type pour les données de la table
export interface TableData {
  indice: number
  nom: string
  prenom: string
  tel: string
  statut: 'rappel' | 'repondeur' | 'absent' | 'rdv' | 'relance' | 'test'
  marqueVeh: string
  modeleVeh: string
  immat: string
}

// Données d'exemple
const sampleData: TableData[] = [
  {
    indice: 1,
    nom: 'MARTIN',
    prenom: 'Jean',
    tel: '06 12 34 56 78',
    statut: 'rdv',
    marqueVeh: 'Renault',
    modeleVeh: 'Clio',
    immat: 'AB-123-CD'
  },
  {
    indice: 2,
    nom: 'DUBOIS',
    prenom: 'Marie',
    tel: '06 98 76 54 32',
    statut: 'test',
    marqueVeh: 'Peugeot',
    modeleVeh: '208',
    immat: 'EF-456-GH'
  },
  {
    indice: 3,
    nom: 'BERNARD',
    prenom: 'Pierre',
    tel: '06 11 22 33 44',
    statut: 'rappel',
    marqueVeh: 'Citroën',
    modeleVeh: 'C3',
    immat: 'IJ-789-KL'
  },
  {
    indice: 4,
    nom: 'THOMAS',
    prenom: 'Sophie',
    tel: '06 55 66 77 88',
    statut: 'relance',
    marqueVeh: 'Volkswagen',
    modeleVeh: 'Golf',
    immat: 'MN-012-OP'
  },
  {
    indice: 5,
    nom: 'PETIT',
    prenom: 'Luc',
    tel: '06 99 88 77 66',
    statut: 'absent',
    marqueVeh: 'Ford',
    modeleVeh: 'Fiesta',
    immat: 'QR-345-ST'
  },
  {
    indice: 6,
    nom: 'ROBERT',
    prenom: 'Anne',
    tel: '06 44 33 22 11',
    statut: 'rdv',
    marqueVeh: 'BMW',
    modeleVeh: 'Série 1',
    immat: 'UV-678-WX'
  },
  {
    indice: 7,
    nom: 'RICHARD',
    prenom: 'Paul',
    tel: '06 77 88 99 00',
    statut: 'rappel',
    marqueVeh: 'Audi',
    modeleVeh: 'A3',
    immat: 'YZ-901-AB'
  },
  {
    indice: 8,
    nom: 'MOREAU',
    prenom: 'Julie',
    tel: '06 12 21 34 43',
    statut: 'relance',
    marqueVeh: 'Mercedes',
    modeleVeh: 'Classe A',
    immat: 'CD-234-EF'
  },
  {
    indice: 9,
    nom: 'SIMON',
    prenom: 'Marc',
    tel: '06 56 65 78 87',
    statut: 'test',
    marqueVeh: 'Toyota',
    modeleVeh: 'Yaris',
    immat: 'GH-567-IJ'
  },
  {
    indice: 10,
    nom: 'MICHEL',
    prenom: 'Claire',
    tel: '06 90 09 12 21',
    statut: 'rdv',
    marqueVeh: 'Nissan',
    modeleVeh: 'Micra',
    immat: 'KL-890-MN'
  },
  {
    indice: 11,
    nom: 'GARCIA',
    prenom: 'Carlos',
    tel: '06 34 43 56 65',
    statut: 'rappel',
    marqueVeh: 'Seat',
    modeleVeh: 'Ibiza',
    immat: 'OP-123-QR'
  },
  {
    indice: 12,
    nom: 'MARTINEZ',
    prenom: 'Elena',
    tel: '06 78 87 90 09',
    statut: 'rdv',
    marqueVeh: 'Opel',
    modeleVeh: 'Corsa',
    immat: 'ST-456-UV'
  },
  {
    indice: 13,
    nom: 'LOPEZ',
    prenom: 'Antonio',
    tel: '06 12 34 56 78',
    statut: 'rappel',
    marqueVeh: 'Fiat',
    modeleVeh: '500',
    immat: 'WX-789-YZ'
  },
  {
    indice: 14,
    nom: 'GONZALEZ',
    prenom: 'Maria',
    tel: '06 98 76 54 32',
    statut: 'rdv',
    marqueVeh: 'Hyundai',
    modeleVeh: 'i20',
    immat: 'AB-012-CD'
  },
  {
    indice: 15,
    nom: 'RODRIGUEZ',
    prenom: 'Carlos',
    tel: '06 11 22 33 44',
    statut: 'absent',
    marqueVeh: 'Kia',
    modeleVeh: 'Picanto',
    immat: 'EF-345-GH'
  },
  {
    indice: 16,
    nom: 'HERNANDEZ',
    prenom: 'Isabella',
    tel: '06 55 66 77 88',
    statut: 'rdv',
    marqueVeh: 'Mazda',
    modeleVeh: '2',
    immat: 'IJ-678-KL'
  },
  {
    indice: 17,
    nom: 'PEREZ',
    prenom: 'Diego',
    tel: '06 99 88 77 66',
    statut: 'test',
    marqueVeh: 'Suzuki',
    modeleVeh: 'Swift',
    immat: 'MN-901-OP'
  },
  {
    indice: 18,
    nom: 'SANCHEZ',
    prenom: 'Lucia',
    tel: '06 44 33 22 11',
    statut: 'rdv',
    marqueVeh: 'Honda',
    modeleVeh: 'Jazz',
    immat: 'QR-234-ST'
  },
  {
    indice: 19,
    nom: 'RAMIREZ',
    prenom: 'Miguel',
    tel: '06 77 88 99 00',
    statut: 'rappel',
    marqueVeh: 'Skoda',
    modeleVeh: 'Fabia',
    immat: 'UV-567-WX'
  },
  {
    indice: 20,
    nom: 'TORRES',
    prenom: 'Carmen',
    tel: '06 12 21 34 43',
    statut: 'rdv',
    marqueVeh: 'Dacia',
    modeleVeh: 'Sandero',
    immat: 'YZ-890-AB'
  },
  {
    indice: 21,
    nom: 'FLORES',
    prenom: 'Rafael',
    tel: '06 56 65 78 87',
    statut: 'absent',
    marqueVeh: 'Mitsubishi',
    modeleVeh: 'Space Star',
    immat: 'CD-123-EF'
  },
  {
    indice: 22,
    nom: 'RIVERA',
    prenom: 'Sofia',
    tel: '06 90 09 12 21',
    statut: 'rdv',
    marqueVeh: 'Subaru',
    modeleVeh: 'Impreza',
    immat: 'GH-456-IJ'
  }
]

interface FilterableTableProps {
  data?: TableData[]
  className?: string
}

export function FilterableTable({ data = sampleData, className }: FilterableTableProps) {
  const [filters, setFilters] = useState({
    indice: '',
    nom: '',
    prenom: '',
    tel: '',
    statut: '',
    marqueVeh: '',
    modeleVeh: '',
    immat: ''
  })
  
  // États pour la sélection et la pagination
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // États pour la gestion des colonnes
  const [visibleColumns, setVisibleColumns] = useState({
    indice: true,
    nom: true,
    prenom: true,
    tel: true,
    statut: true,
    marqueVeh: true,
    modeleVeh: true,
    immat: true
  })

  // Fonction pour mettre à jour un filtre
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }



  // Fonctions pour la sélection de lignes
  const toggleRowSelection = (indice: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(indice)) {
      newSelected.delete(indice)
    } else {
      newSelected.add(indice)
    }
    setSelectedRows(newSelected)
  }

  const toggleAllRowsSelection = (filteredData: TableData[]) => {
    const currentPageData = getCurrentPageData(filteredData)
    const currentPageIndices = currentPageData.map(item => item.indice)
    const allCurrentPageSelected = currentPageIndices.every(indice => selectedRows.has(indice))
    
    const newSelected = new Set(selectedRows)
    if (allCurrentPageSelected) {
      // Désélectionner toutes les lignes de la page actuelle
      currentPageIndices.forEach(indice => newSelected.delete(indice))
    } else {
      // Sélectionner toutes les lignes de la page actuelle
      currentPageIndices.forEach(indice => newSelected.add(indice))
    }
    setSelectedRows(newSelected)
  }

  // Fonction pour obtenir les données de la page actuelle
  const getCurrentPageData = (filteredData: TableData[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  // Fonction pour calculer le nombre total de pages
  const getTotalPages = (filteredData: TableData[]) => {
    return Math.ceil(filteredData.length / itemsPerPage)
  }

  // Fonctions pour la gestion des colonnes
  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }))
  }

  // Fonctions pour les filtres par colonne supprimées

  // Fonction pour effacer tous les filtres
  const clearAllFilters = () => {
    setFilters({
      indice: '',
      nom: '',
      prenom: '',
      tel: '',
      statut: '',
      marqueVeh: '',
      modeleVeh: '',
      immat: ''
    })
    setCurrentPage(1)
  }

  // Données filtrées
  const filteredData = useMemo(() => {
    const filtered = data.filter(item => {
      // Filtres de recherche globaux
      const matchesGlobalFilters = (
        item.indice.toString().toLowerCase().includes(filters.indice.toLowerCase()) &&
        item.nom.toLowerCase().includes(filters.nom.toLowerCase()) &&
        item.prenom.toLowerCase().includes(filters.prenom.toLowerCase()) &&
        item.tel.toLowerCase().includes(filters.tel.toLowerCase()) &&
        item.statut.toLowerCase().includes(filters.statut.toLowerCase()) &&
        item.marqueVeh.toLowerCase().includes(filters.marqueVeh.toLowerCase()) &&
        item.modeleVeh.toLowerCase().includes(filters.modeleVeh.toLowerCase()) &&
        item.immat.toLowerCase().includes(filters.immat.toLowerCase())
      )
      
      // Les filtres par colonne ont été supprimés
      return matchesGlobalFilters
    })
    
    // Réinitialiser à la première page si les filtres changent
    if (currentPage > getTotalPages(filtered) && getTotalPages(filtered) > 0) {
      setCurrentPage(1)
    }
    
    return filtered
  }, [data, filters])

  // Données de la page actuelle
  const currentPageData = useMemo(() => {
    return getCurrentPageData(filteredData)
  }, [filteredData, currentPage])

  // Calculs pour la pagination
  const totalPages = getTotalPages(filteredData)
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length)

  // Vérifier si toutes les lignes de la page actuelle sont sélectionnées
  const allCurrentPageSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.has(item.indice))
  const someCurrentPageSelected = currentPageData.some(item => selectedRows.has(item.indice))

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeVariant = (statut: TableData['statut']) => {
    switch (statut) {
      case 'rappel':
        return 'blue' // Bleu
      case 'repondeur':
        return 'secondary' // Gris
      case 'absent':
        return 'destructive' // Rouge
      case 'rdv':
        return 'default' // Vert
      case 'relance':
        return 'purple' // Violet
      case 'test':
        return 'secondary' // Gris
      default:
        return 'secondary'
    }
  }

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '')

  // Composant pour le filtre par colonne supprimé

  return (
    <div className={`space-y-4 ${className}`}>
      {/* En-tête avec titre, sélection et bouton de réinitialisation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedRows.size > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedRows.size} ligne{selectedRows.size > 1 ? 's' : ''} sélectionnée{selectedRows.size > 1 ? 's' : ''}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Bouton de sélection des colonnes */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Colonnes
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Afficher les colonnes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visibleColumns.indice}
                onCheckedChange={() => toggleColumnVisibility('indice')}
              >
                Indice
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.nom}
                onCheckedChange={() => toggleColumnVisibility('nom')}
              >
                Nom
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.prenom}
                onCheckedChange={() => toggleColumnVisibility('prenom')}
              >
                Prénom
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.tel}
                onCheckedChange={() => toggleColumnVisibility('tel')}
              >
                Téléphone
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.statut}
                onCheckedChange={() => toggleColumnVisibility('statut')}
              >
                Statut
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.marqueVeh}
                onCheckedChange={() => toggleColumnVisibility('marqueVeh')}
              >
                Marque Véhicule
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.modeleVeh}
                onCheckedChange={() => toggleColumnVisibility('modeleVeh')}
              >
                Modèle Véhicule
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.immat}
                onCheckedChange={() => toggleColumnVisibility('immat')}
              >
                Immatriculation
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Effacer les filtres
            </Button>
          )}
        </div>
      </div>

      {/* Ligne de filtres */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Indice"
            value={filters.indice}
            onChange={(e) => updateFilter('indice', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nom"
            value={filters.nom}
            onChange={(e) => updateFilter('nom', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Prénom"
            value={filters.prenom}
            onChange={(e) => updateFilter('prenom', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Téléphone"
            value={filters.tel}
            onChange={(e) => updateFilter('tel', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Statut"
            value={filters.statut}
            onChange={(e) => updateFilter('statut', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Marque"
            value={filters.marqueVeh}
            onChange={(e) => updateFilter('marqueVeh', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Modèle"
            value={filters.modeleVeh}
            onChange={(e) => updateFilter('modeleVeh', e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Immatriculation"
            value={filters.immat}
            onChange={(e) => updateFilter('immat', e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Compteur de résultats et pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {filteredData.length} résultat{filteredData.length > 1 ? 's' : ''} sur {data.length}
        </div>
        {filteredData.length > 0 && (
          <div>
            Affichage de {startIndex} à {endIndex} sur {filteredData.length} résultat{filteredData.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={allCurrentPageSelected}
                  onCheckedChange={() => toggleAllRowsSelection(filteredData)}
                  aria-label="Sélectionner toutes les lignes"
                  className={someCurrentPageSelected && !allCurrentPageSelected ? "data-[state=checked]:bg-primary" : ""}
                />
              </TableHead>
              {visibleColumns.indice && (
                <TableHead className="w-[80px]">
                  <div className="flex items-center justify-between">
                    <span>INDICE</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.nom && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>NOM</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.prenom && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>PRÉNOM</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.tel && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>TÉL</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.statut && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>STATUT</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.marqueVeh && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>MARQUE VEH</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.modeleVeh && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>MODÈLE VEH</span>
                  </div>
                </TableHead>
              )}
              {visibleColumns.immat && (
                <TableHead>
                  <div className="flex items-center justify-between">
                    <span>IMMAT.</span>
                  </div>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            ) : (
              currentPageData.map((item) => (
                <TableRow 
                  key={item.indice} 
                  className={selectedRows.has(item.indice) ? "bg-muted/50" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(item.indice)}
                      onCheckedChange={() => toggleRowSelection(item.indice)}
                      aria-label={`Sélectionner la ligne ${item.indice}`}
                    />
                  </TableCell>
                  {visibleColumns.indice && (
                    <TableCell className="font-medium">{item.indice}</TableCell>
                  )}
                  {visibleColumns.nom && (
                    <TableCell>{item.nom}</TableCell>
                  )}
                  {visibleColumns.prenom && (
                    <TableCell>{item.prenom}</TableCell>
                  )}
                  {visibleColumns.tel && (
                    <TableCell>{item.tel}</TableCell>
                  )}
                  {visibleColumns.statut && (
                    <TableCell>
                      <Badge 
                        variant={getStatusBadgeVariant(item.statut)}
                      >
                        {item.statut}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.marqueVeh && (
                    <TableCell>{item.marqueVeh}</TableCell>
                  )}
                  {visibleColumns.modeleVeh && (
                    <TableCell>{item.modeleVeh}</TableCell>
                  )}
                  {visibleColumns.immat && (
                    <TableCell>{item.immat}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Contrôles de pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
            
            {/* Numéros de pages */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Afficher les 3 premières pages, les 3 dernières, et les pages autour de la page actuelle
                  return page <= 3 || page > totalPages - 3 || Math.abs(page - currentPage) <= 1
                })
                .map((page, index, array) => {
                  // Ajouter des ellipses si nécessaire
                  const prevPage = array[index - 1]
                  const showEllipsis = prevPage && page - prevPage > 1
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  )
                })
              }
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
