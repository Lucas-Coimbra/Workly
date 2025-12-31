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
import { Badge } from "../ui/Badge";
import { AMENITIES_MAP } from "../../../utils/amenities";
import { spaceTypes } from "../../mocks/mockData";
import { useTranslation } from "react-i18next";

export default function Filters({
  spaceType,
  setSpaceType,
  capacity,
  setCapacity,
  amenities = [],
  selectedResources,
  handleResourceToggle,
  totalFound = 0,
  onClear,
}) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-white border shadow-sm rounded-xl h-fit space-y-6">
      <h3 className="text-gray-900 text-lg font-semibold">
        {t("filters.title")}
      </h3>

      {/* Tipo de Espaço */}
      <div>
        <Label>{t("filters.spaceType")}</Label>
        <Select value={spaceType} onValueChange={setSpaceType}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">{t("filters.all")}</SelectItem>

            {spaceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Capacidade */}
      <div>
        <Label>{t("filters.capacity")}</Label>
        <Select value={capacity} onValueChange={setCapacity}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder={t("filters.any")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.any")}</SelectItem>
            <SelectItem value="2">{t("filters.upTo", { count: 2 })}</SelectItem>
            <SelectItem value="5">{t("filters.upTo", { count: 5 })}</SelectItem>
            <SelectItem value="10">
              {t("filters.upTo", { count: 10 })}
            </SelectItem>
            <SelectItem value="20">
              {t("filters.upTo", { count: 20 })}
            </SelectItem>
            <SelectItem value="50">
              {t("filters.upTo", { count: 50 })}
            </SelectItem>
            <SelectItem value="100">
              {t("filters.upTo", { count: 100 })}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Comodidades */}
      <div>
        <Label className="mb-2 block">{t("filters.amenities")}</Label>

        {amenities.length === 0 ? (
          <p className="text-sm text-gray-500">{t("filters.noAmenities")}</p>
        ) : (
          <div className="max-h-56 overflow-y-auto pr-2 space-y-1">
            {amenities.map((id) => {
              const amenity = AMENITIES_MAP[id];
              if (!amenity) return null;

              const Icon = amenity.icon;

              return (
                <label
                  key={id}
                  className="flex items-center gap-2 text-sm cursor-pointer rounded-md px-2 py-1 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedResources.includes(id)}
                    onChange={() => handleResourceToggle(id)}
                  />
                  <Icon size={16} className="text-blue-600" />
                  {amenity.name}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Resultado */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{t("filters.spacesFound")}</span>
        <Badge className="bg-blue-100 text-blue-700">{totalFound}</Badge>
      </div>

      {/* Limpar */}
      <Button variant="outline" className="w-full" onClick={onClear}>
        {t("filters.clearFilters")}
      </Button>
    </Card>
  );
}
