import {
  Card,
  Label,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Globe } from "lucide-react";

export default function PreferencesSettings({
  language,
  setLanguage,
  timezone,
  setTimezone,
  currency,
  setCurrency,
  handleSavePreferences,
  languages,
  timezones,
  currencies,
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Globe className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-gray-900">Preferências</h2>
          <p className="text-sm text-gray-600">Personalize sua experiência</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Idioma */}
        <div>
          <Label>Idioma</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black focus:outline-none border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuso Horário */}
        <div>
          <Label>Fuso Horário</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black focus:outline-none border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Moeda */}
        <div>
          <Label>Moeda</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black focus:outline-none border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        onClick={handleSavePreferences}
      >
        Salvar Preferências
      </Button>
    </Card>
  );
}
