# Basket

A digital agricultural marketplace for smallholder farmers in Nigeria.

Built as the design artefact for a Professional Master's Project on user-centered
design and usability evaluation. It is a static progressive web app: no framework,
no build tooling beyond a single asset-fetch step, and no runtime dependency on a
third-party origin.

## Why it is built this way

The research question is whether farmers with limited literacy and limited
connectivity can complete a marketplace journey unaided. Three consequences:

- **Pictures carry meaning, not words.** Crops are chosen from photographs. Units
  are bags and baskets before kilos, because that is how the market speaks.
- **Language is data.** Every interface string lives in `public/strings.js`, one row
  per key and one column per language — English, Hausa, Igbo and Yoruba. Adding a
  fifth costs a translation, not a rebuild.
- **It must work offline.** A service worker caches the app, the photography and the
  fonts. Sessions are recorded on the device and sync when a connection returns.

## Usability measurement is built in

Open **Me → Facilitator** to start a session. Record the participant code, literacy,
prior smartphone use and whether the device was provided — separately, so they can be
told apart in analysis.

During a session a facilitator bar shows the current task, a live timer, and buttons
to log an assist or an error. Task completion is detected automatically. The 10-item
System Usability Scale follows, administered orally; "cumbersome" is replaced by
"awkward" after Finstad, because the original does not survive oral translation.

Results are at **`/#admin`** — completion by task, unaided rates, SUS by literacy,
and CSV export. Optionally sync to Supabase by pasting a project URL and anon key
into that screen. Never the service role key.

## Transaction screens

The eight `tx-*` screens are illustrative. No money moves. Payment was outside the
scope of the study and outside what was evaluated; the screens exist so the journey
can be followed end to end when presenting.

## Running locally

Any static server over `public/`:

    npx serve public

`npm run build` fetches the produce photography and self-hosts the typefaces. It is
required before the images appear; without it the crop tiles fall back to plain blocks.

## Translations

The Hausa, Igbo and Yoruba strings need native-speaker verification before field use.
Verify by rendering, not only by reading: the test is whether the translated string
still fits the control it sits in.
