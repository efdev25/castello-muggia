import { useState } from 'react';

const experiences = [
  { id: 'visita', label: 'Visita Privata' },
  { id: 'evento', label: 'Evento / Gala' },
  { id: 'shooting', label: 'Shooting Foto/Video' }
];

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [selectedExp, setSelectedExp] = useState('visita');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simula latenza di rete realistica per un feedback lussuoso
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="bg-[#121212] p-10 md:p-14 rounded-3xl text-center text-stone-100 border border-stone-800 shadow-2xl transition-all duration-700 animate-fade-in">
        <div className="w-16 h-16 bg-[#A44B2B]/20 text-[#A44B2B] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border border-[#A44B2B]/30">
          ✓
        </div>
        <h3 className="text-3xl font-serif mb-4 text-white">Richiesta Ricevuta.</h3>
        <p className="text-stone-400 font-light max-w-md mx-auto mb-8 leading-relaxed text-sm md:text-base">
          Il Concierge del Castello ha preso in carico la tua preferenza per l'esperienza <strong className="text-stone-200 font-medium">{experiences.find(e => e.id === selectedExp)?.label}</strong>. Riceverai un invito cifrato via email.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-xs text-[#A44B2B] tracking-widest uppercase hover:underline font-semibold"
        >
          ← Compila una nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-stone-200 border border-stone-100/80 relative overflow-hidden" aria-label="Modulo di prenotazione visite">
      {status === 'loading' && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center transition-all animate-fade-in" role="status" aria-live="polite">
          <div className="w-12 h-12 border-2 border-stone-200 border-t-[#A44B2B] rounded-full animate-spin mb-4"></div>
          <span className="text-xs tracking-widest uppercase text-stone-600 font-medium">Connessione ai registri...</span>
        </div>
      )}

      <h3 className="text-3xl font-serif text-[#121212] mb-2">Pianifica la tua Visita</h3>
      <p className="text-xs text-stone-600 tracking-wider uppercase mb-8">Accesso a numero chiuso • Estate 2026</p>

      <div className="space-y-6">
        {/* Input Nome */}
        <div className="relative">
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full bg-transparent border-b border-stone-300 py-3 text-[#121212] text-sm focus:outline-none focus:border-[#A44B2B] transition-colors placeholder-transparent" 
            id="nome"
            placeholder="Nome e Cognome" 
          />
          <label 
            htmlFor="nome" 
            className="absolute left-0 top-3 text-stone-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#A44B2B]"
          >
            Nome e Cognome *
          </label>
        </div>

        {/* Input Email */}
        <div className="relative">
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-transparent border-b border-stone-300 py-3 text-[#121212] text-sm focus:outline-none focus:border-[#A44B2B] transition-colors placeholder-transparent" 
            id="email"
            placeholder="Email" 
          />
          <label 
            htmlFor="email" 
            className="absolute left-0 top-3 text-stone-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#A44B2B]"
          >
            Indirizzo Email *
          </label>
        </div>

        {/* Selezione Esperienza (Pill Buttons configurati come ARIA radiogroup nativo) */}
        <div role="radiogroup" aria-label="Tipo di esperienza desiderata">
          <span className="block text-xs text-stone-600 tracking-wider uppercase mb-3" aria-hidden="true">Tipo di Esperienza</span>
          <div className="grid grid-cols-3 gap-2">
            {experiences.map((exp) => (
              <button
                type="button"
                role="radio"
                aria-checked={selectedExp === exp.id}
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all border text-center whitespace-nowrap
                  ${selectedExp === exp.id 
                    ? 'bg-[#121212] text-white border-[#121212] shadow-md' 
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}
                `}
              >
                {exp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contatore Ospiti */}
        <div className="flex items-center justify-between pt-2">
          <label htmlFor="contatore-ospiti" className="text-xs text-stone-600 tracking-wider uppercase">Numero Ospiti</label>
          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl p-1">
            <button 
              type="button" 
              aria-label="Rimuovi un ospite"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-white hover:shadow-sm transition-all font-bold"
            >
              -
            </button>
            <span id="contatore-ospiti" className="text-sm font-semibold w-6 text-center text-[#121212]" aria-live="polite">{guests}</span>
            <button 
              type="button" 
              aria-label="Aggiungi un ospite"
              onClick={() => setGuests(Math.min(12, guests + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-white hover:shadow-sm transition-all font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Bottone Invio */}
        <button 
          type="submit" 
          className="w-full mt-6 bg-[#A44B2B] text-white py-4 rounded-xl font-semibold text-sm hover:bg-[#8A3F24] hover:shadow-lg hover:shadow-[#A44B2B]/20 transition-all duration-300"
        >
          Richiedi Invito Ufficiale
        </button>
      </div>
    </form>
  );
}
