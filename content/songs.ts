import type { Song } from "./types";

// Transcripcion del PDF oficial. No se corrigen sus grafias ni se expanden repeticiones.
// Las notas de ensayo se conservan separadas del texto cantado.
export const songs = {
  "salamanca": {
    "id": "salamanca",
    "title": "Salamanca",
    "lyrics": {
      "sourceTitle": "Salamanca",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 1,
      "blocks": [
        {
          "type": "note",
          "text": "-Intro 4 tiempos, arranca la voz en la quinta-"
        },
        {
          "type": "verse",
          "text": "Camino solo, extraviado\nEl bosque está hipnotizándome.\nTierno abrazo del pasado\nno perdona el deseo.\nY dudo, y me digo"
        },
        {
          "type": "note",
          "text": "-Metemos distor-"
        },
        {
          "type": "verse",
          "text": "¿Cuánto cuesta una vida?\n¿Cuánto pesa el amor? BIS\n¿Cuánto alcanza el dinero\nen borrar el dolor?"
        },
        {
          "type": "cue",
          "text": "-puente-"
        },
        {
          "type": "verse",
          "text": "A lo lejos yo percibo\nmucha gente aquí\nEl fuego arde sin parar,\nnos invita a la tentación.\nY dudo, y me digo"
        },
        {
          "type": "verse",
          "text": "¿Cuánto cuesta el dinero?\n¿Cuánto pesa el dolor? BIS\n¿Cuánto alcanza la vida\nen borrar el amor?"
        },
        {
          "type": "cue",
          "text": "-parte final-"
        },
        {
          "type": "cue",
          "text": "-fin-"
        }
      ]
    }
  },
  "caramelo-oscuro": {
    "id": "caramelo-oscuro",
    "title": "Caramelo Oscuro",
    "lyrics": {
      "sourceTitle": "Caramelo Oscuro",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 2,
      "blocks": [
        {
          "type": "note",
          "text": "-Intro 2 vueltas-"
        },
        {
          "type": "verse",
          "text": "Llegaron los 40 grados\nLa vida nos tiene fulminados\nEste verano es de terror\nViajar con amigos es mejor"
        },
        {
          "type": "note",
          "text": "-Distor-"
        },
        {
          "type": "verse",
          "text": "Llegando el anochecer,\nfinal del camino, chocó el destino\ny comenzamos a arder,\nabajo nos fuimos, de prepo lo vimos,\nahí estaba él, ahí estaba él"
        },
        {
          "type": "cue",
          "text": "Estribillo -BIS-"
        },
        {
          "type": "verse",
          "text": "Tenes el poder, deja de joder\nCaramelo oscuro sabe a anochecer\nY desde el ayer sombras arremeten contra de tu espina\nno lo puedes creer"
        },
        {
          "type": "note",
          "text": "-puente 1 vuelta-"
        },
        {
          "type": "verse",
          "text": "Hacen más de mil grados,\nla muerte nos tiene condenados,\nhace cuánto no vemos el sol,\nlas almas en gritos de dolor\nson el pan cotidiano, son nueve peldaños\ndel calor al frío ¿que le vas a hacer?\nPero abajo no vamos, porque ahí está él\nguardián de la puerta vos tenés el poder"
        },
        {
          "type": "cue",
          "text": "Estribillo -BIS-"
        },
        {
          "type": "verse",
          "text": "Tenes el poder, deja de joder\nCaramelo oscuro sabe a anochecer\nY desde el ayer sombras arremeten contra de tu espina\nno lo puedes creer"
        },
        {
          "type": "cue",
          "text": "SOLO"
        },
        {
          "type": "cue",
          "text": "Estribillo -BIS-"
        },
        {
          "type": "verse",
          "text": "Tenes el poder, deja de joder\nCaramelo oscuro sabe a anochecer\nY desde el ayer sombras arremeten contra de tu espina\nno lo puedes creer\nno lo puedes creer\nno lo puedes creer"
        },
        {
          "type": "cue",
          "text": "-Fin-"
        }
      ]
    }
  },
  "espada-de-tinta": {
    "id": "espada-de-tinta",
    "title": "Espada de Tinta",
    "lyrics": {
      "sourceTitle": "Espada de tinta",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 3,
      "blocks": [
        {
          "type": "note",
          "text": "-Intro 2 vueltas y entra la voz-"
        },
        {
          "type": "verse",
          "text": "Acompañado del viento\nBañado estoy del momento\nEn que surgen los vestigios\nDe los que están carcomidos"
        },
        {
          "type": "note",
          "text": "-puente la voz entra en el segundo arpegio-"
        },
        {
          "type": "verse",
          "text": "Es aquí, que la imaginación no tiene fin\nY es ahora, que la realidad se distorsiona"
        },
        {
          "type": "verse",
          "text": "La tempestad no me atemoriza\nLa vida podría ser muy distinta BIS\nA los augurios yo sobrevivo\nY esta es mí espada de tinta"
        },
        {
          "type": "note",
          "text": "(en la segunda vez repetir “mi espada de tinta”)"
        },
        {
          "type": "verse",
          "text": "Destejiendo el tiempo,\ndesenlazando los cuerpos\nLa sangre guía el camino,\nque el alma ha de seguir"
        },
        {
          "type": "note",
          "text": "-puente la voz entra en el segundo arpegio-"
        },
        {
          "type": "verse",
          "text": "Y es aqui, que la realidad no tiene fin\nY es ahora, que tu futuro se distorsiona"
        },
        {
          "type": "verse",
          "text": "La tempestad no me atemoriza\nLa vida podría ser muy distinta BIS\nA los augurios yo sobrevivo\nY está es mí espada de tinta"
        },
        {
          "type": "note",
          "text": "(en la segunda vez repetir “mi espada de tinta”)"
        },
        {
          "type": "cue",
          "text": "-SOLO y fin-"
        }
      ]
    }
  },
  "corazon-ejecutor": {
    "id": "corazon-ejecutor",
    "title": "Corazon Ejecutor",
    "lyrics": {
      "sourceTitle": "Corazón ejecutor",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 4,
      "blocks": [
        {
          "type": "note",
          "text": "-Intro 1 vuelta-"
        },
        {
          "type": "verse",
          "text": "De los ríos del corazón, queda aún sangre por escurrir\nOtra historia que mí memoria graba a pesar del sentir\nAl final nada está librado del toxi control del azar\nVos no creas que la lluvia no te va a alcanzar"
        },
        {
          "type": "note",
          "text": "-Puente 1 vuelta limpia, una distor-"
        },
        {
          "type": "verse",
          "text": "Yo también ya se por qué\nLa gula acompaña a la sed BIS\nCorazón con razón\nA veces pesa mucho el deber!"
        },
        {
          "type": "note",
          "text": "-Quitamos distor-"
        },
        {
          "type": "verse",
          "text": "Hoy mis traumas me saludan sentados en la esquina de mí habitación\nYo ya no les pido perdón, ni permiso, ni hola, ni adiós\nTropezones y remendones entrenan el corazón\nEl ropero es un cementerio y las heridas son una canción"
        },
        {
          "type": "note",
          "text": "-puente con distor 2 vueltas-"
        },
        {
          "type": "cue",
          "text": "-Solo-"
        },
        {
          "type": "verse",
          "text": "Yo también ya se por qué\nLa gula acompaña a la sed BIS\nCorazón con razón\nA veces pesa mucho el deber!"
        },
        {
          "type": "note",
          "text": "-Puente final, segunda vuelta cortada para terminar-"
        }
      ]
    }
  },
  "sin-nombre": {
    "id": "sin-nombre",
    "title": "S/N",
    "lyrics": {
      "sourceTitle": "S/N (Canción sin nombre)",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 5,
      "blocks": [
        {
          "type": "note",
          "text": "-intro 1 vuelta Elias solo, luego entramos todos en la segunda-"
        },
        {
          "type": "verse",
          "text": "Hoy estamos divididos amor,\npero encontramos solución al dolor\nFue lo mejor, lo mejor nuestro amor,\npero también la única solución"
        },
        {
          "type": "cue",
          "text": "-puente instrumental 2 vueltas-"
        },
        {
          "type": "verse",
          "text": "Tienes un brillo, es multicolor\nMe hizo reir, me hizo vivir,\npero un adiós percibió el horizonte\ny yo nunca lo pude ver venir\nY es que el paisaje se fundio con tu ser,\nTus ojos, tu pelo, hacen juego con tu atardecer"
        },
        {
          "type": "verse",
          "text": "Hacen juego con tu atardecer x3"
        },
        {
          "type": "cue",
          "text": "-puente-"
        },
        {
          "type": "verse",
          "text": "Nuestra historia fue un cuento de amor,\ninicio, conflicto y final,\nesos recuerdos siempre quedarán,\ntu sonrisa no podré olvidar,\nY es que el fuego se fundió con tu ser,\ncenizas hoy quedan donde hubo un amanecer"
        },
        {
          "type": "verse",
          "text": "Donde hubo un amanecer x3"
        },
        {
          "type": "note",
          "text": "-sólo (tiene dos vueltas)-"
        },
        {
          "type": "note",
          "text": "-corte final (1 vuelta)-"
        },
        {
          "type": "cue",
          "text": "Fin"
        }
      ]
    }
  },
  "nochecita-en-el-jumeal": {
    "id": "nochecita-en-el-jumeal",
    "title": "Nochecita en el Jumeal",
    "audioUrl": "/audio/Syncro%2022%20-%20Nochecita%20en%20el%20Jumeal.mp3",
    "lyrics": {
      "sourceTitle": "Nochecita en el Jumeal",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 6,
      "blocks": [
        {
          "type": "cue",
          "text": "Intro (cuatro vueltas)"
        },
        {
          "type": "verse",
          "text": "Una noche en el Jumeal\nBirrita y algo más\nTrae a tus amigos\nVamos a celebrar\nEntras gratis, no hay salida\nYa la mesa está servida\nPenantes y otras sombras\nNos marcan de por vida"
        },
        {
          "type": "cue",
          "text": "Estribillo 1"
        },
        {
          "type": "verse",
          "text": "Avisame\nSi te fallan los sentidos\nSi te sangran los oídos\nUna noche en el Jumeal\nLlena de casos perdidos\nEl suelo que retumba,\ngente bailando en penumbras\nHay sombras que susurran\nY nos hacen blasfemar"
        },
        {
          "type": "verse",
          "text": "Cuando cae la oscuridad\nNo hay ficción ni realidad\nLa línea no existe\nLo vas a averiguar\nEl pacto ya hecho está\nNo podes mirar atrás\nEl te perseguirá\nY lo vas a lamentar"
        },
        {
          "type": "cue",
          "text": "Estribillo"
        },
        {
          "type": "cue",
          "text": "Solo"
        },
        {
          "type": "cue",
          "text": "Fin"
        }
      ]
    }
  },
  "lenguas-largas": {
    "id": "lenguas-largas",
    "title": "Lenguas Largas",
    "lyrics": {
      "sourceTitle": "Lengua Larga",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 7,
      "blocks": [
        {
          "type": "cue",
          "text": "[Intro]"
        },
        {
          "type": "cue",
          "text": "[Estrofa 1]"
        },
        {
          "type": "verse",
          "text": "Que jeta abierta que no sabe callar\nLengua de fuego lista para quemar\nSos un fantasma de la deducción\nTu moral abunda en putrefacción"
        },
        {
          "type": "cue",
          "text": "Puente"
        },
        {
          "type": "cue",
          "text": "[Estrofa 2]"
        },
        {
          "type": "verse",
          "text": "Susurros oscuros llegan a mis oídos\nRíen del caos que van a sembrar\nSe que te esfuerzas por cortarnos el camino\nPero no me importa porque vos sos un"
        },
        {
          "type": "cue",
          "text": "[Estribillo]"
        },
        {
          "type": "verse",
          "text": "Indigno, maligno\nVos solo querés tu fortuna agrandar\nTu verdad te duele y la vas a pagar\nHasta el averno te vamos a arrastrar"
        },
        {
          "type": "cue",
          "text": "[Puente]"
        },
        {
          "type": "cue",
          "text": "[Estrofa 3]"
        },
        {
          "type": "verse",
          "text": "Gente oprimida, sin dirección\nPreguntan dónde quedó la compasión\nCallados avanzan hacia el matadero\nTu odio apunta y es muy certero! Pues sos"
        },
        {
          "type": "cue",
          "text": "[Estribillo]"
        },
        {
          "type": "cue",
          "text": "[Solo]"
        },
        {
          "type": "cue",
          "text": "[Estribillo]"
        },
        {
          "type": "cue",
          "text": "Fin"
        }
      ]
    }
  },
  "amarre": {
    "id": "amarre",
    "title": "Amarre",
    "lyrics": {
      "sourceTitle": "Amarre",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 8,
      "blocks": [
        {
          "type": "cue",
          "text": "Intro"
        },
        {
          "type": "verse",
          "text": "Quiero saber cuánto valen tus penas,\nQuiero entender tu mundo a mí manera\nSol a sol parece fácil no vivir\nSiendo nabo que no tiene idea dónde ir"
        },
        {
          "type": "verse",
          "text": "Cuidado con lo que deseas\nMe lo dijo una loba presa. No quiero\nser Oseas, quiero ver adónde voy\nQuiero saber si pasar de Asimov a Tolstoy"
        },
        {
          "type": "verse",
          "text": "Hay fuegos que agradan cuando queman\nMentiras que atrapan la presa\nHay quienes van y eligen sentir ese ardor\nCreo que el amor no es el único motor"
        },
        {
          "type": "cue",
          "text": "Solo"
        },
        {
          "type": "verse",
          "text": "Siento fantasmas de cuerpos que aprietan mi pecho y\nNo puedo escapar a la maldita soledad\nCaricias sin dedos, de amores añejos y\nuna mirada que no tiene piedad\ndebo matar, aniquilar, este sentimiento acá no tiene lugar\nque debo hacer? Que debo hacer para destruir\neste amarre?"
        },
        {
          "type": "cue",
          "text": "Solo"
        },
        {
          "type": "cue",
          "text": "Fin"
        }
      ]
    }
  },
  "abrazo-del-angel": {
    "id": "abrazo-del-angel",
    "title": "Abrazo del angel",
    "lyrics": {
      "sourceTitle": "Abrazo del angel",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 9,
      "blocks": [
        {
          "type": "cue",
          "text": "Estrofa:"
        },
        {
          "type": "verse",
          "text": "Acompáñame lejos del sol\nlas estrellas nos alumbran\nen la sima el futuro nos esperará\nVen no temas, experimenta,\nmuchos van a salir a presagiar\npero no abrazan su oscuridad"
        },
        {
          "type": "cue",
          "text": "Estribillo:"
        },
        {
          "type": "verse",
          "text": "Soy sal de la tierra, hoy vine hasta acá\nbusco las alas que el viento me supo brindar, no se donde están"
        },
        {
          "type": "cue",
          "text": "Puente"
        },
        {
          "type": "cue",
          "text": "Estrofa:"
        },
        {
          "type": "verse",
          "text": "No te dolió la caída corazón?\n¿Cuándo fué la última vez que él te ayudó?\nNos juntemos y quememos su tiranía\nY esa será la salida\nVen, no dejes que te convenzan,\nTu cabeza no es su propiedad,\nPero seguro lo van a intentar"
        },
        {
          "type": "cue",
          "text": "Estribillo:"
        },
        {
          "type": "verse",
          "text": "Soy sal de la tierra, hoy vine hasta acá\nbusco las alas que el viento me supo brindar, no se donde están"
        },
        {
          "type": "cue",
          "text": "Solo de bajo"
        },
        {
          "type": "cue",
          "text": "Estribillo:"
        },
        {
          "type": "verse",
          "text": "Soy sal de la tierra, hoy vine hasta acá\nbusco las alas que el viento me supo brindar, no se donde están"
        },
        {
          "type": "cue",
          "text": "outro"
        },
        {
          "type": "cue",
          "text": "fin"
        }
      ]
    }
  },
  "posesion": {
    "id": "posesion",
    "title": "POSESION",
    "lyrics": {
      "sourceTitle": "Posesión",
      "sourceDocument": "Letras Syncro22.pdf",
      "sourcePage": 10,
      "blocks": [
        {
          "type": "cue",
          "text": "Intro"
        },
        {
          "type": "cue",
          "text": "Estrofa 1"
        },
        {
          "type": "verse",
          "text": "Que es la voluntad si ya no soy dueño\nde todos mis secretos?\nCeder la libertad a la dominación\nde todos mis procesos"
        },
        {
          "type": "cue",
          "text": "Pre estribillo"
        },
        {
          "type": "verse",
          "text": "Caigo y me levantas\nPierdo cordura\nLos gritos del alma\nCambian de textura"
        },
        {
          "type": "cue",
          "text": "Estribillo"
        },
        {
          "type": "verse",
          "text": "De mí vos nunca vas a escapar\nMe alimento de sangre y oscuridad\nResisto pero va a explotar\nEl infierno tiene piedad"
        },
        {
          "type": "cue",
          "text": "Pausa y parte instrumental"
        },
        {
          "type": "cue",
          "text": "Solo"
        },
        {
          "type": "cue",
          "text": "Pre estribillo"
        },
        {
          "type": "cue",
          "text": "Estribillo"
        }
      ]
    }
  }
} satisfies Record<string, Song>;
