function getCuratedFallback(destination, mood) {
  const norm = destination.toLowerCase();
  if (norm.includes("madrid")) {
    return [
      {
        id: "cur-m1",
        title: "Paseo del Arte & Museo del Prado VIP",
        category: "Fast Track",
        bookingCode: "MAD-PRADO-77X",
        venue: "Museo Nacional del Prado, Madrid",
        date: "14 de Junio, 2026",
        time: "10:30 AM - 13:00 PM",
        gate: "Puerta de Jerónimos",
        price: "24.00",
        description: "Acceso preferente para admirar las obras maestras de Velázquez, Goya y El Bosco sin esperas.",
        color: "yellow"
      },
      {
        id: "cur-m2",
        title: "Atardecer Flamenco en Jardines de Sabatini",
        category: "Acceso VIP",
        bookingCode: "MAD-SAB-09Y",
        venue: "Real Palacio - Sabatini, Madrid",
        date: "15 de Junio, 2026",
        time: "19:40 PM - 21:30 PM",
        gate: "Entrada Principal de Jardines",
        price: "45.00",
        description: "Una copa de tempranillo y un espectáculo flamenco de primera categoría frente al imponente Palacio Real.",
        color: "pink"
      },
      {
        id: "cur-m3",
        title: "Tour de Tapas Clandestinas y Vino de Madrid",
        category: "Pase Privado",
        bookingCode: "MAD-TAP-11Z",
        venue: "Mercado de San Miguel y Tabernas Ocultas",
        date: "16 de Junio, 2026",
        time: "20:00 PM - 23:00 PM",
        gate: "Mesa VIP Reservada",
        price: "60.00",
        description: "Recorrido privado por tabernas históricas ocultas con maridajes exclusivos guiados por un sumiller local.",
        color: "cyan"
      }
    ];
  } else if (norm.includes("cop") || norm.includes("din") || norm.includes("copenhague")) {
    return [
      {
        id: "cur-c1",
        title: "Pase Ilimitado Jardines de Tivoli",
        category: "Acceso Multiride",
        bookingCode: "CPH-TIV-909",
        venue: "Jardines de Tivoli, Vesterbrogade",
        date: "20 de Junio, 2026",
        time: "11:00 AM - 22:00 PM",
        gate: "Main Archway",
        price: "55.00",
        description: "Disfruta de uno de los parques de atracciones más antiguos y mágicos del mundo con acceso a todas las montañas rusas.",
        color: "cyan"
      },
      {
        id: "cur-c2",
        title: "Crucero Solar por Canales de Nyhavn & Christianshavn",
        category: "Entrada General",
        bookingCode: "CPH-CRU-842",
        venue: "Nyhavn Canal Front (Muelle 4)",
        date: "21 de Junio, 2026",
        time: "15:00 PM - 16:30 PM",
        gate: "Muelle Solar 2",
        price: "18.50",
        description: "Explora la arquitectura de vanguardia de Copenhague navegando en un barco silencioso 100% de energía solar.",
        color: "green"
      },
      {
        id: "cur-c3",
        title: "Cata de Cervezas y Quesos Nórdicos en Nørrebro",
        category: "Pase Especial",
        bookingCode: "CPH-NOR-311",
        venue: "Mikkeller & Friends Nørrebro",
        date: "22 de Junio, 2026",
        time: "18:00 PM - 20:00 PM",
        gate: "Entrada Nørrebro",
        price: "32.00",
        description: "Un maridaje gourmet con artesanías líquidas locales y quesos curados premiados de granjas ecológicas danesas.",
        color: "yellow"
      }
    ];
  } else {
    return [
      {
        id: "cur-s1",
        title: "Asientos VIP Ópera en Teatro Antico di Taormina",
        category: "Acceso VIP",
        bookingCode: "SIC-TAOR-800",
        venue: "Teatro Antiguo de Taormina, Sicilia",
        date: "25 de Junio, 2026",
        time: "20:30 PM - 23:00 PM",
        gate: "Cávea Inferior - Fila A",
        price: "85.00",
        description: "Una experiencia lírica inolvidable bajo las estrellas con acústica milenaria y vistas directas al volcán Etna de fondo.",
        color: "pink"
      },
      {
        id: "cur-s2",
        title: "Aventura 4x4 Cráteres Activos del Monte Etna",
        category: "Fast Track",
        bookingCode: "SIC-ETNA-502",
        venue: "Base Refugio Sapienza, Etna",
        date: "26 de Junio, 2026",
        time: "08:30 AM - 13:30 PM",
        gate: "Punto de Encuentro Alpinas",
        price: "65.00",
        description: "Cruza flujos de lava históricos y camina por el borde de cráteres inactivos guiado por expertos vulcanólogos.",
        color: "yellow"
      },
      {
        id: "cur-s3",
        title: "Crucero en Yate y Snorkel en Reserva Isola Bella",
        category: "Pase de Lujo",
        bookingCode: "SIC-BELLA-123",
        venue: "Bahía de Mazzaró, Taormina",
        date: "27 de Junio, 2026",
        time: "14:00 PM - 18:00 PM",
        gate: "Muelle de Embarque Azul",
        price: "50.00",
        description: "Explora grutas escondidas y nada en aguas turquesas rodeado del majestuoso paraje natural protegido de Isola Bella.",
        color: "green"
      }
    ];
  }
}

module.exports = { getCuratedFallback };
