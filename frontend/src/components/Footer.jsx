import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-700 rounded flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Workly</h3>
            </div>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm md:text-base">
              {t("footer.links.title")}
            </h4>
            <ul className="flex flex-col gap-2 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.links.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.links.plans")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.links.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm md:text-base">
              {t("footer.support.title")}
            </h4>
            <ul className="flex flex-col gap-2 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.support.faq")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.support.help")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm md:text-base">
              {t("footer.contact.title")}
            </h4>
            <p className="text-sm md:text-base text-slate-400">
              {t("footer.contact.email")} <br />
              {t("footer.contact.phone")}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-2 text-center sm:text-left">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-3 justify-center sm:justify-start">
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
