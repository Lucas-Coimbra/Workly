import { MapPin } from "lucide-react";
import { Card, Input, Label } from "../ui";

export default function AddressCard({
  profileData,
  tempData,
  isEditing,
  setTempData,
}) {
  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">Endereço</h3>

      <div className="space-y-4">
        <div>
          <Label>Endereço</Label>
          {isEditing ? (
            <Input
              value={tempData.address}
              onChange={(e) =>
                setTempData({ ...tempData, address: e.target.value })
              }
              className="mt-2"
            />
          ) : (
            <div className="flex items-center gap-2 mt-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-500" />
              {profileData.address}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Cidade</Label>
            {isEditing ? (
              <Input
                value={tempData.city}
                onChange={(e) =>
                  setTempData({ ...tempData, city: e.target.value })
                }
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-gray-700">{profileData.city}</p>
            )}
          </div>

          <div>
            <Label>Estado</Label>
            {isEditing ? (
              <Input
                value={tempData.state}
                onChange={(e) =>
                  setTempData({ ...tempData, state: e.target.value })
                }
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-gray-700">{profileData.state}</p>
            )}
          </div>

          <div>
            <Label>CEP</Label>
            {isEditing ? (
              <Input
                value={tempData.zipCode}
                onChange={(e) =>
                  setTempData({ ...tempData, zipCode: e.target.value })
                }
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-gray-700">{profileData.zipCode}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
