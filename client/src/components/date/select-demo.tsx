import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner un fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Pomme</SelectItem>
          <SelectItem value="banana">Banane</SelectItem>
          <SelectItem value="blueberry">Myrtille</SelectItem>
          <SelectItem value="grapes">Raisin</SelectItem>
          <SelectItem value="pineapple">Ananas</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
