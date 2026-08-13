import { siteConfig } from "@/lib/site";

const faqs = [
  {
    q: "How accurate is the forecast?",
    a: "Forecasts come from Open-Meteo, which blends national weather-service models such as ICON, GFS and ECMWF. Current conditions and the hourly outlook are refreshed continuously, and accuracy is highest within the first 48 hours.",
  },
  {
    q: "Do I need an account or an API key?",
    a: "No. Aura is free and works straight away — there is nothing to sign up for and no key to configure.",
  },
  {
    q: "How do I see the weather for my own location?",
    a: "Tap the location button next to the search bar and allow location access, or type any city name into the search box to jump to it.",
  },
  {
    q: "What does “feels like” temperature mean?",
    a: "It is the apparent temperature — what the air actually feels like on your skin once humidity, wind and sunshine are taken into account, which can differ from the measured temperature by several degrees.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/**
 * Static, crawlable copy. The forecast itself is fetched in the browser, so
 * this is the substantive text search engines can actually index — and it
 * carries the FAQ structured data.
 */
export default function SeoContent() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="glass mt-4 scroll-mt-24 rounded-3xl p-6 text-sm leading-relaxed text-white/70 sm:p-8"
    >
      <script
        type="application/ld+json"
        // Static, author-controlled content — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h2 id="about-heading" className="text-base font-semibold text-white">
        Live weather forecasts for any city
      </h2>
      <p className="mt-3">
        {siteConfig.name} shows the current temperature, how warm it actually
        feels, humidity, wind speed, UV index, air pressure and precipitation
        for wherever you are — or for any city you search. Below that you get an
        hour-by-hour outlook for the next 24 hours and a 7-day forecast with the
        daily high and low, so you can see a cold snap or a wet weekend coming
        before it arrives.
      </p>
      <p className="mt-3">
        Weather data comes from Open-Meteo, which draws on national
        meteorological services, and the background photography changes with the
        conditions and the time of day. Everything is free, needs no account and
        works on phones, tablets and desktops.
      </p>

      <h2 id="faq" className="mt-8 scroll-mt-24 text-base font-semibold text-white">
        Frequently asked questions
      </h2>
      <dl className="mt-3 space-y-4">
        {faqs.map(({ q, a }) => (
          <div key={q}>
            <dt className="font-medium text-white/90">{q}</dt>
            <dd className="mt-1">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
