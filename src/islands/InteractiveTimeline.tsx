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
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8">
        {storici.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`snap-center shrink-0 w-[85vw] md:w-80 p-8 rounded-3xl text-left transition-all duration-500 border
                ${isActive ? 'bg-stone-800/80 border-[#A44B2B] scale-100' : 'bg-stone-900/40 border-stone-800 scale-95 opacity-60'}
              `}
            >
              <div className="text-[#A44B2B] font-serif text-xl mb-4 italic">{item.anno}</div>
              <h3 className="text-2xl font-serif mb-3 text-stone-100">{item.titolo}</h3>
              <p className="text-stone-400 font-light text-sm">{item.testo}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
