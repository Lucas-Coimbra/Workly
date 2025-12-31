import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MapPin, Users } from "lucide-react";
import { AMENITIES_MAP } from "../../../utils/amenities";
import { useTranslation } from "react-i18next";

/* helpers */
function formatAddress(space) {
  return [
    space.street,
    space.number && `nº ${space.number}`,
    space.neighborhood,
    space.city && `${space.city}${space.state ? "/" + space.state : ""}`,
  ]
    .filter(Boolean)
    .join(", ");
}

function resolveMainPrice(space) {
  if (space.pricePerHour) {
    return { value: space.pricePerHour, label: "/hora" };
  }

  if (space.pricePerDay) {
    return { value: space.pricePerDay, label: "/dia" };
  }

  if (space.pricePerMonth) {
    return { value: space.pricePerMonth, label: "/mês" };
  }

  return null;
}

const MAX_AMENITIES = 4;

export default function SpaceCard({ space, onShowDetails, onSelectSpace }) {
  const { t } = useTranslation();
  const amenities = space.amenities ?? [];
  const address = formatAddress(space);
  const price = resolveMainPrice(space);

  const visibleAmenities = amenities.slice(0, MAX_AMENITIES);
  const hiddenCount = amenities.length - MAX_AMENITIES;

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        {/* Image / Placeholder */}
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-12 h-12 text-blue-400" />
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-gray-900 font-medium">{space.name}</h4>
              {address && <p className="text-sm text-gray-600">{address}</p>}
            </div>

            <Badge className="bg-green-100 text-green-700">
              {t("spaceCard.available")}
            </Badge>
          </div>

          {/* Main info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
            {space.capacity && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {space.capacity}{" "}
                {space.capacity === 1
                  ? t("spaceCard.person")
                  : t("spaceCard.people")}
              </span>
            )}

            {price ? (
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                R$ {price.value}
                <span className="text-xs text-gray-500">{price.label}</span>
              </span>
            ) : (
              <span className="text-gray-400 italic">
                {t("spaceCard.priceOnRequest")}
              </span>
            )}
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {visibleAmenities.map((id) => {
                const amenity = AMENITIES_MAP[id];
                if (!amenity) return null;

                const Icon = amenity.icon;

                return (
                  <Badge
                    key={id}
                    variant="outline"
                    className="flex items-center gap-1 border-gray-200 text-gray-600 bg-gray-50"
                  >
                    <Icon size={14} />
                    {amenity.name}
                  </Badge>
                );
              })}

              {hiddenCount > 0 && (
                <Badge
                  variant="outline"
                  className="cursor-pointer border-gray-200 text-gray-500 bg-gray-50"
                  onClick={() => onShowDetails?.(space)}
                >
                  +{hiddenCount}
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShowDetails?.(space)}
            >
              {t("spaceCard.viewDetails")}
            </Button>

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onSelectSpace?.(space)}
            >
              {t("spaceCard.reserve")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
