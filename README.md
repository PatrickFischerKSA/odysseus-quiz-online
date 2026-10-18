# Odysseus – Rückfahrt mit Hindernissen

**[Jetzt spielen](https://patrickfischerksa.github.io/odysseus-quiz-online/)** · [GitHub-Repository](https://github.com/PatrickFischerKSA/odysseus-quiz-online)

Ein vollständig im Browser spielbares Literaturquiz nach Auguste Lechners *Die Abenteuer des Odysseus*: zwölf bebilderte Missionen, vier steigende Schwierigkeitsstufen, maximal 60 Punkte. Für Einzelpersonen oder Crews von 2–4 Lernenden an einem Gerät.

## Spielen

- Freie Namen und Antworten eingeben, Stationen mit Pfeilen oder Ziehen sortieren, falsche Meldungen korrigieren und begründete Urteile schreiben.
- Erst abgeben, dann Lösungen und genaue Bewertungskriterien sehen.
- Eindeutige Namen und Reihenfolgen werden automatisch verglichen. Längere Antworten und Deutungen werden transparent per Selbstcheck bewertet; die Lehrperson kann mitmoderieren. Ein Wortvergleich hilft, ersetzt aber keine inhaltliche Prüfung. Andere begründete Urteile sind ausdrücklich zulässig.
- Ein Hinweis pro Reise ohne Punktabzug; mitlaufende, pausierbare Uhr ohne Zeitlimit.
- Spielstand lokal speichern, nach dem Schliessen fortsetzen, Ergebnis mit Antworten und Lösungen als Textdatei herunterladen oder drucken.
- Keine Anmeldung, kein Backend, keine Datenbank, keine externen Dienste und keine Laufzeit-Abhängigkeiten. Kein geräteübergreifender Mehrspielermodus.

## Lokal starten

Node.js ab Version 20 ist nur für Vorschau und Prüfungen nötig. Es müssen keine Pakete installiert werden.

```sh
npm start
```

Dann die im Terminal ausgegebene Adresse öffnen, normalerweise `http://127.0.0.1:4173`. Port bei Bedarf mit `PORT=4180 npm start` ändern. `index.html` wegen der JavaScript-Module über HTTP aufrufen; nicht per Doppelklick über `file://`.

```sh
npm test
npm run check
```

## Auf GitHub Pages veröffentlichen

1. Ein GitHub-Repository erstellen und **den Inhalt dieses Projektordners** hineinkopieren. Auch `.github/workflows/pages.yml` und `dist/.nojekyll` gehören dazu. Beim Browser-Upload ausgeblendete Dateien mit beachten; am einfachsten mit Git oder GitHub Desktop übertragen.
2. Den Branch `main` verwenden.
3. Unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
4. Auf `main` pushen oder unter **Actions → GitHub Pages → Run workflow** den Workflow manuell starten.
5. Nach dem erfolgreichen Lauf zeigt **Settings → Pages** die öffentliche Spieladresse. Der Workflow stellt den Inhalt von `dist/` bereit.

Alle Ressourcen verwenden relative Pfade. Das Spiel funktioniert deshalb auch unter `https://BENUTZER.github.io/REPOSITORY/` und unter einer eigenen Domain. GitHub Pages muss für das Repository verfügbar und aktiviert sein. Workflow-Grundlage: [offizielle GitHub-Dokumentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Alternativ lässt sich der komplette Inhalt von `dist/` auf jedem statischen Webhost ablegen. Ein Buildschritt ist nicht nötig; `npm run build` prüft die unverändert auslieferbaren Dateien.

## Dateien

| Pfad | Inhalt |
|---|---|
| `dist/index.html` | Einstieg |
| `dist/style.css` | Responsives Layout, Tastaturfokus und Druckansicht |
| `dist/app.js` | Spielablauf, Eingaben, Selbstcheck, lokale Speicherung und Export |
| `dist/missions.js` | Alle Aufgaben, Kriterien, Musterlösungen und Textnachweise |
| `dist/engine.js` | Punkte, Antwortvergleich, Zustandsprüfung und Bericht |
| `dist/assets/` | Lokal gespeicherte Illustrationen und Symbol |
| `.github/workflows/pages.yml` | Prüfung und Deployment auf GitHub Pages |
| `tests/engine.test.mjs` | Funktionstests ohne zusätzliche Pakete |

## Unterricht und Inhalte

Die erste Runde prüft Figuren und Grundwissen; die zweite Zusammenhänge und Reihenfolge; die dritte List, Regeln und Fehler; die vierte Beweiskraft und Verantwortung. Richtzeit insgesamt 45–60 Minuten mit Besprechung. Bei Level 4 kann die Buchvorlage helfen.

Textgrundlage: Auguste Lechner, *Die Abenteuer des Odysseus*, E-Book-Ausgabe 2020, Tyrolia, neu überarbeitet von Friedrich Stephan. Seitenangaben bezeichnen die PDF-Zählung der bereitgestellten 250-seitigen Datei. Das urheberrechtlich geschützte Buch ist nicht Teil dieses Repositories. Fragen und Lösungen sind neu formuliert; Scherze sind moderne Zuspitzungen, keine Lechner-Zitate.

Illustrationen wurden aus der vorhandenen Unterrichtseinheit «Odysseus-Scherbengericht» übernommen. Sie sind freie künstlerische Darstellungen und teilweise nur atmosphärisch zugeordnet. Bilddetails sind keine Textbelege. Herkunft und Lizenzumfang sind in `CREDITS.md` getrennt vom Programmcode dokumentiert.

## Speicherung und Grenzen

Der Browser speichert Antworten und Punkte unter `odysseus-voyage-v1` in `localStorage`. «Neu anfangen» löscht diesen Spielstand nach einer Rückfrage. Auf gemeinsam benutzten Geräten sind gespeicherte Antworten für die nächste Person sichtbar. Browserdaten löschen oder privater Modus kann den Spielstand entfernen. Das Spiel selbst versendet keine Antworten; der Hostinganbieter verarbeitet die üblichen Verbindungsdaten.

Die Lösungen liegen im ausgelieferten JavaScript. Das ist ein transparentes Lernspiel und keine manipulationssichere Prüfung. Selbstbewertung wird auch im Ergebnisbericht als solche bezeichnet. Es gibt keine KI-Bewertung und keine automatische Benotung freier Deutungen.
