import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { Gamepad2, ExternalLink, Sparkles, FlaskConical } from 'lucide-react';
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
];

const Games = () => {
  const { t, getRaw } = useLanguage();
  const genres = getRaw('games.phacker.genre') || [];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-jost">
      <WishesBackground />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-green/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12 pb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Gamepad2 className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">
              {t('games.badge')}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-reem font-bold mb-6 tracking-tight leading-none">
            <span className="text-white opacity-90">{t('games.title').split(' ')[0]}</span>{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-brand-gradient">
              {t('games.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="text-white/60 font-light max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed">
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
          {/* Section divider */}
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-px bg-gradient-to-r from-brand-yellow to-transparent"
            />
            <span className="text-xs tracking-[0.3em] uppercase text-brand-yellow font-bold whitespace-nowrap">
              {t('games.featured')}
            </span>
          </div>

          <div className="group relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-brand-yellow/20 transition-all duration-500 shadow-2xl">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/[0.04] via-transparent to-brand-green/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* ── Left: Terminal Visual ── */}
              <div className="relative h-72 lg:h-auto min-h-[360px] bg-[#050505] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.04]">
                {/* Scrolling terminal code */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 font-mono text-brand-green/[0.09] text-[11px] leading-6 overflow-hidden select-none p-6"
                >
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i}>{`> ${terminalLines[i % terminalLines.length]}`}</div>
                  ))}
                </div>

                {/* Central icon */}
                <div className="relative z-10 text-center px-8">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center shadow-[0_0_40px_rgba(245,192,12,0.15)]"
                  >
                    <FlaskConical className="w-11 h-11 text-brand-yellow" />
                  </motion.div>
                  <div className="font-mono text-brand-green text-sm mb-1.5 tracking-[0.2em]">
                    $ P-HACKER
                  </div>
                  <div className="text-white/30 text-xs font-mono tracking-widest">
                    v1.0 · science_and_cheating
                  </div>
                </div>

                {/* Scanlines */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.12)_3px,rgba(0,0,0,0.12)_4px)] pointer-events-none"
                />

                {/* Corner decoration */}
                <div className="absolute top-4 left-4 flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green/60" />
                </div>
              </div>

              {/* ── Right: Game Info ── */}
              <div className="p-8 md:p-12 xl:p-16 flex flex-col justify-between gap-10">
                <div className="space-y-6">
                  {/* Live badge */}
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                      {t('games.available')}
                    </span>
                  </div>

                  {/* Name + tagline */}
                  <div>
                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-reem font-bold tracking-tight leading-none mb-3">
                      {t('games.phacker.name')}
                    </h2>
                    <p className="text-brand-yellow/70 italic font-light text-lg">
                      {t('games.phacker.tagline')}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 font-light leading-relaxed text-base md:text-lg">
                    {t('games.phacker.desc')}
                  </p>

                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/50 text-xs font-bold tracking-wider uppercase"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <a
                    href={PHACKER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-yellow text-[#050505] font-reem font-bold text-lg hover:bg-white transition-colors duration-300 group/btn active:scale-95"
                  >
                    {t('games.playNow')}
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                  <p className="mt-4 text-white/30 text-xs">
                    {t('games.available')} · ES / EN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Coming Soon ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 md:p-20 rounded-[3rem] bg-[#0A0A0A] border border-white/5 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.025] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <Sparkles className="w-8 h-8 text-brand-yellow/40 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-reem font-bold mb-4">
              {t('games.moreGames.title')}
            </h3>
            <p className="text-white/50 font-light leading-relaxed mb-8">
              {t('games.moreGames.desc')}
            </p>
            <div className="inline-flex items-center gap-2 text-white/30 text-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green/60 animate-pulse" />
              {t('games.comingSoon')}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Games;
