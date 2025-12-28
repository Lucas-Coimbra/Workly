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
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PreferencesSettings({
  language,
  timezone,
  currency,
  handleSavePreferences,
  languages,
  timezones,
  currencies,
}) {
  const { t } = useTranslation();

  // ================== ESTADOS LOCAIS ==================
  const [localLanguage, setLocalLanguage] = useState(language);
  const [localTimezone, setLocalTimezone] = useState(timezone);
  const [localCurrency, setLocalCurrency] = useState(currency);

  // Sincroniza os estados locais quando os props mudarem
  useEffect(() => {
    setLocalLanguage(language);
    setLocalTimezone(timezone);
    setLocalCurrency(currency);
  }, [language, timezone, currency]);

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Globe className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-gray-900">{t("preferences")}</h2>
          <p className="text-sm text-gray-600">{t("preferencesDescription")}</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-4">
        {/* Idioma */}
        <div>
          <Label>{t("language")}</Label>
          <Select value={localLanguage} onValueChange={setLocalLanguage}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black border border-gray-300">
              <SelectValue placeholder={t("selectLanguage")} />
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
          <Label>{t("timezone")}</Label>
          <Select value={localTimezone} onValueChange={setLocalTimezone}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black border border-gray-300">
              <SelectValue placeholder={t("selectTimezone")} />
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
          <Label>{t("currency")}</Label>
          <Select value={localCurrency} onValueChange={setLocalCurrency}>
            <SelectTrigger className="mt-2 bg-gray-200 text-black border border-gray-300">
              <SelectValue placeholder={t("selectCurrency")} />
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

      {/* Botão Salvar */}
      <Button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        onClick={() =>
          handleSavePreferences(localLanguage, localTimezone, localCurrency)
        }
      >
        {t("savePreferences")}
      </Button>
    </Card>
  );
}
