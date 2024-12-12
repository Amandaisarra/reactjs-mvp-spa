export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre Nós</h1>

          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Somos uma plataforma dedicada a conectar profissionais de tecnologia com as melhores
              conferências e eventos do Brasil.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Nossa Missão</h2>
            <p className="text-gray-700 mb-6">
              Facilitar o acesso ao conhecimento e networking na área de tecnologia, reunindo em um
              só lugar as principais conferências do setor.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">O que oferecemos</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Curadoria das melhores conferências de tecnologia</li>
              <li>Processo simplificado de inscrição</li>
              <li>Informações detalhadas sobre cada evento</li>
              <li>Filtros avançados para encontrar o evento ideal</li>
              <li>Suporte dedicado aos participantes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contato</h2>
            <p className="text-gray-700">Para mais informações, entre em contato conosco:</p>
            <ul className="list-none text-gray-700 mt-2 space-y-1">
              <li>Email: contato@conferencias.tech</li>
              <li>Telefone: (11) 9999-9999</li>
              <li>Horário: Segunda a Sexta, das 9h às 18h</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
