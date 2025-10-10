export default function Hero({ onNavigate }) {
  return (
    <section className="bg-gradient-to-br from-[#E0F2FE] to-[#BFDBFE] py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-[3.5rem] md:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
            O futuro do trabalho <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
              flexível está aqui
            </span>
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Gerencie espaços de coworking, reserve salas de reunião e
            escritórios privados de forma inteligente e eficiente.
          </p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => onNavigate("register")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            >
              Começar Gratuitamente
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="px-8 py-4 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fazer Login
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            ✓ Sem cartão de crédito necessário ✓ Cancelamento a qualquer momento
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-w-md w-full p-6">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full text-[1.5rem]">
                  📊
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">92%</div>
                  <div className="text-gray-500 text-sm">Ocupação</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full text-[1.5rem]">
                  💰
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">R$ 45K</div>
                  <div className="text-gray-500 text-sm">Receita</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
