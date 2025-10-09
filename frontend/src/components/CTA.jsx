import React from "react";

export default function CTA({ onNavigate }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-24 text-center text-white">
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
