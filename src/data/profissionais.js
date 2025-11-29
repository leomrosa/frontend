const profissionais = [ 
  {
    id: "1",
    nome: "Joana Silva",
    localizacao: "Lisboa",
    freguesia: "Areeiro",
    foto: "/assets/profissionais/ana.jpg",
    bio: "Especialista em fisioterapia desportiva com foco em reabilitação de atletas.",
    especialidadesDetalhadas: [
      {
        especialidade: "Fisioterapia",
        subespecialidade: "Fisioterapia Desportiva",
        preco: 40
      },
      {
        especialidade: "Fisioterapia",
        subespecialidade: "Fisioterapia Músculo-Esquelética",
        preco: 42
      },
      {
        especialidade: "Osteopatia",
        subespecialidade: "",
        preco: 38
      }
    ],
    formacoes: [
      "Licenciatura em Fisioterapia - Escola Superior de Saúde",
      "Pós-graduação em Reabilitação Desportiva"
    ],
    locaisTrabalho: [
      "Clínica Movimento",
      "Hospital Santa Maria"
    ],
    idiomas: [
      { idioma: "Português", nivel: "Nativo" },
      { idioma: "Inglês", nivel: "Intermédio" }
    ],
    areasAtuacao: ["Areeiro", "Alvalade", "Campo de Ourique"]
  },
  {
    id: "2",
    nome: "Carlos Martins",
    localizacao: "Porto",
    freguesia: "Cedofeita",
    foto: "/assets/profissionais/joao.jpg",
    bio: "Osteopata experiente com abordagem centrada no alívio da dor crónica e mobilidade.",
    especialidadesDetalhadas: [
      {
        especialidade: "Osteopatia",
        subespecialidade: "",
        preco: 35
      }
    ],
    formacoes: [
      "Licenciatura em Osteopatia - ESSV",
      "Curso Avançado em Técnicas Miofasciais"
    ],
    locaisTrabalho: [
      "Clínica Terapias Norte"
    ],
    idiomas: [
      { idioma: "Português", nivel: "Nativo" }
    ],
    areasAtuacao: ["Cedofeita", "Boavista"]
  },
  {
    id: "3",
    nome: "Rita Fernandes",
    localizacao: "Lisboa",
    freguesia: "Penha de França",
    foto: "/assets/profissionais/marta.jpg",
    bio: "Enfermeira dedicada aos cuidados domiciliários, com especialização em paliativos.",
    especialidadesDetalhadas: [
      {
        especialidade: "Enfermagem ao domicílio",
        subespecialidade: "",
        preco: 30
      }
    ],
    formacoes: [
      "Licenciatura em Enfermagem - ESEL",
      "Especialização em Cuidados Paliativos"
    ],
    locaisTrabalho: [
      "Serviço Domiciliário EnfCare"
    ],
    idiomas: [
      { idioma: "Português", nivel: "Nativo" },
      { idioma: "Francês", nivel: "Intermédio" }
    ],
    areasAtuacao: ["Penha de França", "Arroios"]
  }
];

export default profissionais;