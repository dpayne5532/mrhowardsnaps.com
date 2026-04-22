import { useState, useEffect } from 'react';

const photos = [
  { src: '/photos/distinguished.jpeg', caption: 'The Distinguished Gentleman', note: 'That silver muzzle. Those ancient, knowing eyes.' },
  { src: '/photos/smile-couch.jpeg', caption: 'The Couch Smile', note: 'Absolutely thrilled. About nothing. About everything.' },
  { src: '/photos/puppy-days.jpeg', caption: 'Puppy Days', note: 'Original tiny version. Same soul. Pink collar era.' },
  { src: '/photos/snow-watch.jpeg', caption: 'First Snow Watch', note: 'Guarding the window. The yard is his jurisdiction.' },
  { src: '/photos/belly-rubs.jpeg', caption: 'Belly Rubs, Please', note: 'He will accept nothing less than a full rub session.' },
  { src: '/photos/toothy-grin.jpeg', caption: 'The Toothy Grin', note: 'When he rolls over and remembers he has teeth.' },
  { src: '/photos/lobster.jpeg', caption: 'Sir Lobster Paws', note: 'He wore this with extraordinary dignity.' },
  { src: '/photos/peekaboo.jpeg', caption: 'Blanket Peekaboo', note: 'Just one eye, making sure the world is still there.' },
  { src: '/photos/blanket-burrito.jpeg', caption: 'The Blanket Burrito', note: 'Peak coziness. Do not disturb this sacred shape.' },
  { src: '/photos/naptime.jpeg', caption: 'Naptime', note: 'The official Mr. Howard sleep position.' },
  { src: '/photos/upside-down.jpeg', caption: 'Upside-Down Zoomies', note: 'Photographic proof that joy has a default position.' },
  { src: '/photos/yard-play.jpeg', caption: 'Yard Patrol', note: 'Blue toy. Green grass. Pure intent.' },
];

const funFacts = [
  { emoji: '🐾', label: 'White sock count', value: '4 toes, 1 chest patch' },
  { emoji: '😴', label: 'Favorite hobby', value: 'Professional blanket burrito' },
  { emoji: '🦴', label: 'Signature move', value: 'The upside-down happy wiggle' },
  { emoji: '💖', label: 'Goodness level', value: 'Off the charts' },
];

const testimonials = [
  { text: 'I said "who\'s a good boy?" and he knew it was him.', who: 'Everyone, always' },
  { text: 'Ten out of ten, would pet again.', who: 'The couch' },
  { text: 'He looked at me and I felt seen.', who: 'A blanket' },
  { text: 'Best boy in the entire house. And probably the yard.', who: 'The yard' },
];

function Hero() {
  return (
    <header className="hero">
      <div className="hero-inner">
        <p className="eyebrow">A very serious archive</p>
        <h1>
          Mr. Howard<span className="sparkle">✦</span>
        </h1>
        <p className="tagline">
          The goodest boy. The coziest companion. A small-batch, hand-crafted,
          artisanal puppy of the highest caliber.
        </p>
        <div className="hero-badges">
          <span className="badge">Certified Goodest</span>
          <span className="badge">Snack Connoisseur</span>
          <span className="badge">Licensed Cuddler</span>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/photos/distinguished.jpeg" alt="" />
      </div>
    </header>
  );
}

function FactStrip() {
  return (
    <section className="facts">
      {funFacts.map((f) => (
        <div className="fact" key={f.label}>
          <div className="fact-emoji">{f.emoji}</div>
          <div className="fact-label">{f.label}</div>
          <div className="fact-value">{f.value}</div>
        </div>
      ))}
    </section>
  );
}

function Gallery({ onOpen }) {
  return (
    <section className="gallery" id="gallery">
      <div className="section-head">
        <h2>The Snaps</h2>
        <p>A curated collection of unretouched brilliance.</p>
      </div>
      <div className="grid">
        {photos.map((p, i) => (
          <figure
            className={`card span-${(i % 5) + 1}`}
            key={p.src}
            onClick={() => onOpen(i)}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(i)}
          >
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>
              <span className="cap-title">{p.caption}</span>
              <span className="cap-note">{p.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Lightbox({ index, onClose, onNav }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onNav]);

  if (index === null) return null;
  const p = photos[index];
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
      <button
        className="lb-nav lb-prev"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
      >‹</button>
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        <img src={p.src} alt={p.caption} />
        <figcaption>
          <strong>{p.caption}</strong>
          <span>{p.note}</span>
        </figcaption>
      </figure>
      <button
        className="lb-nav lb-next"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
      >›</button>
    </div>
  );
}

function AboutHim() {
  return (
    <section className="about">
      <div className="about-copy">
        <h2>About the Boy</h2>
        <p className="lead">
          Mr. Howard is a small, sleek, mostly-black gentleman with four white
          toes, one splash of white chest, and a silver muzzle earned through
          many years of excellent behavior.
        </p>
        <p>
          He is a world-class napper, an enthusiastic greeter, and a quiet but
          effective supervisor of all household activities. Strangers become
          friends. Couches become thrones. Blankets become, inevitably, his.
        </p>
        <p>
          If you have met him: you already know. If you have not: we are so
          sorry, and also, here are some photos.
        </p>
      </div>
      <div className="about-quote">
        <blockquote>
          "Ten pounds of heart in a fifty-pound dog."
        </blockquote>
        <cite>— anyone who has met him</cite>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-head">
        <h2>Reviews</h2>
        <p>Unsolicited, unprompted, and overwhelmingly positive.</p>
      </div>
      <div className="quote-grid">
        {testimonials.map((t) => (
          <figure className="quote" key={t.text}>
            <blockquote>{t.text}</blockquote>
            <figcaption>— {t.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Made with 🐾 for Mr. Howard, the greatest puppy in the world.</p>
      <p className="small">He is, in fact, a very good boy.</p>
    </footer>
  );
}

export default function App() {
  const [lbIndex, setLbIndex] = useState(null);
  const onOpen = (i) => setLbIndex(i);
  const onClose = () => setLbIndex(null);
  const onNav = (dir) =>
    setLbIndex((i) => (i === null ? null : (i + dir + photos.length) % photos.length));

  return (
    <div className="app">
      <Hero />
      <FactStrip />
      <AboutHim />
      <Gallery onOpen={onOpen} />
      <Testimonials />
      <Footer />
      <Lightbox index={lbIndex} onClose={onClose} onNav={onNav} />
    </div>
  );
}
