import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Gamepad2, ExternalLink, Sparkles } from 'lucide-react';
import WishesBackground from '../components/WishesBackground';

const PHACKER_URL = 'https://deploy-preview-53--p-hacker-game.netlify.app/';

const terminalLines = [
  'publish_research(hypothesis)',
  'run_analysis(p_value=0.04)',
  'vote(approve=True)',
  'p_hack(data, target=0.05)',
  'uncover_truth()',
  'conceal_results()',
  'submit_paper(journal="Nature")',
  'peer_review(status="pending")',
  'manipulate_data(careful=False)',
  'run_test(n=1000, cheat=True)',
];

const Games = () => {
  const { t, getRaw, lang } = useLanguage();
  const genres = getRaw('games.phacker.genre') || [];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-jost">
      <WishesBackground />

      {/* Ambient glows — brand palette */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-brand-purple/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/8 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12 pb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Gamepad2 className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">
              {t('games.badge')}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-reem font-bold mb-6 tracking-tight leading-none">
            <span className="text-white opacity-90 block">{t('games.title').split(' ')[0]}</span>
            <span className="text-transparent bg-clip-text bg-brand-gradient block">
              {t('games.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="text-white/60 font-light max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed mx-auto md:mx-0">
            {t('games.subtitle')}
          </p>
        </motion.div>

        {/* ── Featured Game: P-Hacker ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-28"
        >
          {/* Section marker — same style as Products page */}
          <div className="mb-14">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-gradient-to-r from-brand-blue to-transparent mb-6"
            />
            <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-bold">
              {t('games.featured')}
            </span>
          </div>

          {/* ── Main card ── */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-all duration-700 shadow-2xl">

            {/* Card ambient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">

              {/* ── Left: Visual Panel ── */}
              <div className="relative min-h-[380px] lg:min-h-[560px] bg-[#060608] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.04]">

                {/* Subtle code lines — aligned with site's minimal aesthetic */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 font-mono text-white/[0.035] text-[11px] leading-7 overflow-hidden select-none p-8"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i}>{`> ${terminalLines[i % terminalLines.length]}`}</div>
                  ))}
                </div>

                {/* Brand gradient glow blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 pointer-events-none" />

                {/* Central hero text — brand typography */}
                <div className="relative z-10 text-center px-8 select-none">
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <p className="font-mono text-white/25 text-xs tracking-[0.4em] uppercase mb-5">
                      $ p-hacker v1.0
                    </p>
                    <h2 className="font-reem font-bold text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-transparent bg-clip-text bg-brand-gradient mb-4">
                      P-Hacker
                    </h2>
                    <p className="text-white/30 font-light text-sm tracking-widest italic">
                      science_and_cheating
                    </p>
                  </motion.div>
                </div>

                {/* Scanlines — very subtle */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.06)_3px,rgba(0,0,0,0.06)_4px)] pointer-events-none"
                />

                {/* Corner accent ring */}
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-purple/10 blur-[60px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-blue/10 blur-[60px] pointer-events-none" />
              </div>

              {/* ── Right: Game Info ── */}
              <div className="p-8 md:p-12 xl:p-16 flex flex-col justify-between gap-10 min-h-[480px] lg:min-h-0">

                <div className="space-y-7">

                  {/* Status badge — site style */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                    <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">
                      {t('games.available')}
                    </span>
                  </div>

                  {/* Name + tagline */}
                  <div>
                    <h3 className="text-5xl md:text-6xl font-reem font-bold tracking-tight leading-none mb-3">
                      {t('games.phacker.name')}
                    </h3>
                    <p className="text-brand-blue font-medium italic text-lg md:text-xl">
                      {t('games.phacker.tagline')}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 font-light leading-relaxed text-base md:text-lg max-w-md">
                    {t('games.phacker.desc')}
                  </p>

                  {/* Genre tags — styled like About page feature cards */}
                  <div className="flex flex-wrap gap-3">
                    {genres.map((g, i) => {
                      const colors = [
                        { text: 'text-brand-blue', bg: 'bg-brand-blue/10', border: 'border-brand-blue/20' },
                        { text: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20' },
                        { text: 'text-white/60', bg: 'bg-white/[0.03]', border: 'border-white/10' },
                      ][i] || { text: 'text-white/60', bg: 'bg-white/[0.03]', border: 'border-white/10' };
                      return (
                        <span
                          key={i}
                          className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider uppercase ${colors.bg} ${colors.border} ${colors.text}`}
                        >
                          {g}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* CTA — site standard style (white + blue hover, matching Home/Products) */}
                <div className="space-y-4">
                  <a
                    href={PHACKER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95 bg-white text-black font-reem font-bold text-lg"
                  >
                    <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center gap-3 group-hover/btn:text-white transition-colors">
                      {t('games.playNow')}
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </a>
                  <p className="text-white/25 text-xs font-light tracking-wide pl-1">
                    ES / EN · Gratis en navegador
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Coming Soon — same style as Products bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-12 md:p-24 rounded-[4rem] bg-[#0A0A0A] border border-white/5 text-center relative overflow-hidden group/cta shadow-2xl"
        >
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.02] group-hover/cta:opacity-[0.05] transition-opacity duration-1000" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <Sparkles className="w-8 h-8 text-white/20 mx-auto mb-6" />
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-reem font-bold mb-6 tracking-tight leading-none">
              {t('games.moreGames.title')}
            </h3>
            <p className="text-white/50 font-light leading-relaxed text-base md:text-lg mb-10">
              {t('games.moreGames.desc')}
            </p>
            <Link
              to="/contact"
              className="group/btn relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95 bg-white text-black font-reem font-bold text-lg shadow-[0_20px_50px_rgba(255,255,255,0.08)]"
            >
              <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3 group-hover/btn:text-white transition-colors">
                {lang === 'es' ? 'Mantente en contacto' : 'Stay in touch'}
                <Sparkles className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
              </span>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Games;
