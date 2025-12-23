import { Camera, Star } from "lucide-react";
import { Badge, Card } from "../ui";

export default function ProfileHeader({ profileData, stats }) {
  const initials = profileData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
            {initials}
          </div>

          {/* Upload de foto */}
          <label className="absolute bottom-0 left-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Arquivo selecionado:", file);
                  // futuramente: upload / preview
                }
              }}
            />

            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </label>
        </div>

        {/* Informações */}
        <div className="flex-1">
          <h2 className="text-gray-900 text-lg font-semibold leading-tight">
            {profileData.name}
          </h2>

          <p className="text-gray-500 text-sm">{profileData.position}</p>

          <div className="mt-2">
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 flex items-center gap-1 pointer-events-none">
              <Star className="w-3 h-3" />
              {stats.membershipLevel} Member
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
