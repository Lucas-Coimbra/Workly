import { Card } from "../ui/Card";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

export default function Filters({
  spaceType,
  setSpaceType,
  capacity,
  setCapacity,
  selectedResources,
  handleResourceToggle,
  totalFound = 0,
  onClear,
  onSearch,
}) {
  const resources = ["Wi-Fi", "Projetor", "TV", "Ar Condicionado"];

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm h-fit">
      <h3 className="text-gray-900 mb-4">Filtros</h3>

      <div className="space-y-4">
        <div>
          <Label>Tipo de Espaço</Label>
          <Select value={spaceType} onValueChange={setSpaceType}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="meeting">Sala de Reunião</SelectItem>
              <SelectItem value="desk">Mesa</SelectItem>
              <SelectItem value="office">Escritório Privado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Capacidade</Label>
          <Select value={capacity} onValueChange={setCapacity}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer</SelectItem>
              <SelectItem value="1">1 pessoa</SelectItem>
              <SelectItem value="2-5">2–5 pessoas</SelectItem>
              <SelectItem value="6-10">6–10 pessoas</SelectItem>
              <SelectItem value="10+">10+ pessoas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Recursos</Label>
          <div className="space-y-2">
            {resources.map((res, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedResources.includes(res)}
                  onChange={() => handleResourceToggle(res)}
                />
                {res}
              </label>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 text-white"
          onClick={() => onSearch?.()}
        >
          Buscar Espaços ({totalFound})
        </Button>

        <Button variant="outline" className="w-full" onClick={onClear}>
          Limpar Filtros
        </Button>
      </div>
    </Card>
  );
}
