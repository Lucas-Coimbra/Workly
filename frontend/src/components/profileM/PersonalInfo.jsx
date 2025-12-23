import { User, Mail, Phone, Building, TrendingUp, MapPin } from "lucide-react";
import { Card, Input, Textarea, Label, Separator, Button } from "../ui";
import { Edit2, CheckCircle } from "lucide-react";

export default function PersonalInfo({
  profileData,
  tempData,
  isEditing,
  setTempData,
}) {
  return (
    <>
      {/* Informações Pessoais */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Informações Pessoais</h3>
        <div className="space-y-4">
          {/* Nome e E-mail */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Completo</Label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.name}
                  onChange={(e) =>
                    setTempData({ ...tempData, name: e.target.value })
                  }
                  className="mt-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.name}</span>
                </div>
              )}
            </div>

            <div>
              <Label>E-mail</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={tempData.email}
                  onChange={(e) =>
                    setTempData({ ...tempData, email: e.target.value })
                  }
                  className="mt-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Telefone */}
          <div>
            <Label>Telefone</Label>
            {isEditing ? (
              <Input
                type="tel"
                value={tempData.phone}
                onChange={(e) =>
                  setTempData({ ...tempData, phone: e.target.value })
                }
                className="mt-2"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{profileData.phone}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Empresa e Cargo */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Empresa</Label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.company}
                  onChange={(e) =>
                    setTempData({ ...tempData, company: e.target.value })
                  }
                  className="mt-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.company}</span>
                </div>
              )}
            </div>

            <div>
              <Label>Cargo</Label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.position}
                  onChange={(e) =>
                    setTempData({ ...tempData, position: e.target.value })
                  }
                  className="mt-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.position}</span>
                </div>
              )}
            </div>
          </div>

          {/* Biografia */}
          <div>
            <Label>Biografia</Label>
            {isEditing ? (
              <Textarea
                value={tempData.bio}
                onChange={(e) =>
                  setTempData({ ...tempData, bio: e.target.value })
                }
                className="mt-2"
                rows={3}
                placeholder="Conte um pouco sobre você..."
              />
            ) : (
              <p className="text-gray-700 mt-2">{profileData.bio}</p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
