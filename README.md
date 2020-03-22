<p align="center"><img src="src/assets/logo.svg" alt="Karantenehjelpen Logo" height="100px" /></p>
<h1 align="center">
  Karantenehjelpen
</h1>
<p align="center">
  <a href="https://github.com/s0lvang/Karantenehjelpen/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster">
      <img src="https://img.shields.io/github/workflow/status/s0lvang/Karantenehjelpen/Node.js%20CI?style=flat-square" alt="Pipeline status"/></a>
  <a href="https://github.com/s0lvang/Karantenehjelpen/releases" alt="Release version">
      <img src="https://img.shields.io/github/v/release/s0lvang/Karantenehjelpen?style=flat-square" /></a>
  <a href="https://github.com/s0lvang/Karantenehjelpen/commits/master">
      <img src="https://img.shields.io/github/commits-since/s0lvang/Karantenehjelpen/latest?label=commits%20to%20be%20deployed&style=flat-square" alt="Commits since a release" /></a>
  <a href="https://github.com/s0lvang/Karantenehjelpen/issues">
      <img src="https://img.shields.io/github/issues-closed/s0lvang/Karantenehjelpen?style=flat-square" alt="Issues clossed"></a>
    <h4 align="center"><a href="https://karantenehjelpen.no/">Nettside</a> | <a href="./CONTRIBUTING.md">Bidra</a> | <a href="https://github.com/s0lvang/Karantenehjelpen/issues">Bug-rapport</a> | <a href="mailto:karantenehjelpen@online.ntnu.no">Kontakt</a></h4>
</p>

[**Karantenehjelpen**](https://karantenehjelpen.no) er en nettside hvor personer som ikke har mulighet til å utføre hverdagslige oppgaver grunnet koronaviruset kan komme i kontakt med friske personer som ønsker å hjelpe til. 

Om du skulle trenge hjelp med å handle inn matvarer, eller gå tur med hunden din, kan du legge ut en enkel forespørsel på nettsiden. Da vil den dukke opp for alle som har lyst til å hjelpe deg, og forhåpentligvis vil en av de ta på seg oppdraget!

**Følg FHI sine råd!**

Det er viktig at alle bidrar i nasjonaldugnaden, derfor oppfordrer vi på det sterkeste at du følger FHI sine råd. [Se her for mer informasjon](https://www.fhi.no/nettpub/coronavirus/fakta/rad-og-informajon-til-befolkningen-om-nytt-koronavirus-coronavirus-2019-nco/).

Her kan vi se et bilde av startsiden vår:

![Bilde av startside](/src/assets/startside.jpg)

<!-- Kanskje bytt ut bildet med en kul GIF -->

## Bidra

Karantenehjelpen er et open-source prosjekt og derfor vil vi gjerne ønske dere velkommen til å bidra gjennom issues og pull requester. Ta gjerne en titt på våre [bidragsretningslinjer](./CONTRIBUTING.md)

<!-- Skrive noe mer inspirerende her Kanskje noe om dugnad? -->

## Utvikling og Oppsett

Teknologistacken vår består av **Vue** i frontenden og **Firebase** som en løsning for blant annet autentisering, databasehåndtering og hosting.

For å kunne kjøre opp nettsiden til å kjøre opp lokalt så trenger du:

- Node.js og `npm`
- Sette envoriment-variabler for Firebase.
  - For å få all funksjonalitet (SMS og Kartet) til siden opp så kreves også envoriment-variabler for Twilio og Mapbox

Her kan du finne et eksempel på en [.env fil](./envexample). Vi kan tilby en liten testdatabase dere kan bruke.

<!-- Skriv noe om plis ikke fuck firebaseinstansen opp vi stoler på dere bla bla dugnadsånd--->

<!--
Vi bør skrive noe om:

- firebase, .env og sånn
- Prettier config og oppsett
- Kanskje hvilket techstacken
-->

Vi anbefaler å bruke `prettier` for linting av koden.

### Kjøre opp prosjektet

For å laste ned alle dependencies projsektet krever.

```bash
npm install
```

Deretter kan du kjøre opp prosjektet med hot-reloading, som er lurt for utvikling, med

```bash
npm run serve
```

For å linte prosjektet

```bash
npm run lint
npm run prettier-fix
```

<!-- Stapp inn ting som er litt mindre viktig å se med en gang men hvis folk har lyst å lese -->

## Historie

<!-- Noe om medisin studenter ut i arbeid bla bla, du vet (@aslakhol ;). -->

## Bidragsytere

<!-- stapp inn en av de kule bildene der de viser github bildet av alle contributors i hele repoet. -->
[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/0)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/0)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/1)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/1)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/2)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/2)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/3)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/3)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/4)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/4)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/5)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/5)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/6)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/6)[![](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/images/7)](https://sourcerer.io/fame/FredrikAugust/s0lvang/Karantenehjelpen/links/7)

## Credits

Logo lagd av [Richa @ Noun Project](https://thenounproject.com/ayushi12/collection/set-5/?i=2097590).

Badges lagd med [Shields.io](https://shields.io/)

<!-- Kanskje takke velferdstinget, online og de som hjelper oss med ressurser, støtte, publikasjon og sånn??? -->
