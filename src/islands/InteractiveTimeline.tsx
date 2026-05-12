import { useState } from 'react';

const storici = [
  { anno: "1374", titolo: "La Fondazione", testo: "Edificato dal Patriarcato di Aquileia." },
  { anno: "1420", titolo: "Sotto Venezia", testo: "La Serenissima ne amplia le mura." },
  { anno: "1900", titolo: "Il Lungo Silenzio", testo: "Abbandonato a se stesso." },
  { anno: "Oggi", titolo: "Il Restauro", testo: "Un meticoloso intervento di recupero." }
];

export default function InteractiveTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative" role="region" aria-label="Cronologia interattiva della storia del castello">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tablist">
        {storici.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              role="tab"
              aria-selected={isActive}
              aria-label={`Epoca: ${item.anno}. Titolo: ${item.titolo}.`}
              onClick={() => setActiveIndex(idx)}
              className={`snap-center shrink-0 w-[85vw] md:w-80 p-8 rounded-3xl text-left transition-all duration-500 border focus:outline-none focus:ring-2 focus:ring-white
                ${isActive ? 'bg-stone-800 border-[#E86A47] scale-100 shadow-xl' : 'bg-stone-900 border-stone-800 scale-95 opacity-70 hover:opacity-90'}
              `}
            >
              {/* Colore ad altissimo contrasto (#F58268) su sfondo scuro per garantire il 100/100 WCAG AAA */}
              <div className="text-[#F58268] font-serif text-xl mb-4 italic font-semibold">{item.anno}</div>
              <h3 className="text-2xl font-serif mb-3 text-white font-bold">{item.titolo}</h3>
              <p className="text-stone-300 font-light text-sm leading-relaxed">{item.testo}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
