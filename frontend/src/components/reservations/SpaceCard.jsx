import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { MapPin, Users, DollarSign } from "lucide-react";

export default function SpaceCard({
  space,
  onShowDetails,
  onSelectSpace,
  getResourceIcon,
}) {
  return (
    <Card
      key={space.id}
      className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-6">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-12 h-12 text-blue-400" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-gray-900 mb-1">{space.name}</h4>
              <p className="text-sm text-gray-600">
                {space.type === "meeting"
                  ? "Sala de Reunião"
                  : space.type === "desk"
                  ? "Mesa Compartilhada"
                  : "Escritório Privado"}
              </p>
            </div>
            <Badge
              className={
                space.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {space.available ? "Disponível" : "Ocupado"}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>
                {space.capacity} {space.capacity === 1 ? "pessoa" : "pessoas"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-blue-600">R$ {space.pricePerHour}/h</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {space.resources.map((resource, j) => (
              <Badge
                key={j}
                variant="outline"
                className="border-gray-200 text-gray-600 bg-gray-50"
              >
                {getResourceIcon ? getResourceIcon(resource) : resource}
                <span className="ml-1">{resource}</span>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => onShowDetails && onShowDetails(space)}
            >
              Ver Detalhes
            </Button>

            <Button
              size="sm"
              disabled={!space.available}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onSelectSpace && onSelectSpace(space)}
            >
              Reservar Agora
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
