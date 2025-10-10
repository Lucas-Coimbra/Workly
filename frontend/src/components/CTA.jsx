export default function CTA({ onNavigate }) {
  return (
    <section className="py-24 text-center text-white bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para transformar seu coworking?
        </h2>
        <p className="mb-6 text-gray-100 text-lg">
          Junte-se a centenas de espaços que já utilizam o Workly
        </p>
        <button
          onClick={() => onNavigate("register")}
          className="px-10 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:scale-105 transition"
        >
          Criar Conta Gratuita
        </button>
      </div>
    </section>
  );
}
