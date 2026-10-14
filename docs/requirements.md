# Formål og baggrund
Systemet skal give virksomhed X et samlet overblik over virksomhedens indgåede kontrakter og aftaler med leverandører. Brugerne skal kunne se, hvad de enkelte kontrakter omfatter, herunder tilknyttede produkter eller ydelser og relevante aftaleoplysninger.

Systemet skal gøre det muligt for relevante medarbejdere at administrere kontrakterne og finde de oplysninger, de har brug for. Det skal desuden hjælpe virksomheden med at identificere kontrakter, der nærmer sig udløb eller kræver handling, eksempelvis fornyelse eller opsigelse.

Systemet skal i første omgang anvendes af én virksomhed med flere medarbejdere. Løsningen skal dog designes med henblik på, at den senere kan udvides til flere virksomheder med adskilte data og adgangsrettigheder. Det skal ligeledes være muligt at udvide systemets understøttelse af forskellige kontrakttyper og forretningsbehov uden at skulle ændre hele systemets grundlæggende struktur.

Systemets første version fokuserer på leverandøraftaler, der omfatter produkter eller ydelser med aftalte priser. Håndtering af juridiske processer, elektroniske underskrifter og lignende ligger uden for projektets nuværende scope.

# Målgruppe
Medarbejdere der skal administrere en virksomheds kontrakter, eller medarbejdere med behov for indblik i virksomhedens kontrakter.

# Afgrænsning
Første version fokuserer på overblik og administration af leverandøraftaler. Elektroniske underskrifter og håndtering af juridiske processer er ikke omfattet af projektets nuværende scope.

Login og autentificering er ikke en del af første version. Systemet skal dog understøtte registrering af medarbejderen bag kontraktrelaterede handlinger, så sporbarheden kan implementeres og demonstreres uden et fuldt autentificeringssystem.

# Funktionelle krav
## Leverandører
### FR-001: Opret leverandør
Systemet skal give en bruger mulighed for at oprette en leverandør med dertilhørende oplysninger.

### FR-002: Se leverandører
Systemet skal give en bruger mulighed for at se oplysninger om en registreret leverandør.

### FR-003: Opdatere leverandør
Systemet skal give brugeren mulighed for opdatere oplysninger på en registreret leverandør.

### FR-004: Markere leverandør som inaktiv
Systemet skal give brugeren mulighed for at markere en leverandør som inaktiv uden at slette leverandørens oplysninger eller tilknyttede kontrakthistorik.

### FR-009: Genaktivere leverandør
Systemet skal genaktivere en leverandør så snart der er indgået en ny kontrakt, også selvom kontrakten først træder i kraft senere.

### FR-034: Se leverandørens kontrakter
Systemet skal give brugeren mulighed for at se en leverandørs oplysninger samt en samlet liste over leverandørens aktive og historiske kontrakter.

## Kontrakter
### FR-005: Opret kontrakt
Systemet skal give en bruger mulighed for at oprette en kontrakt med dertilhørende oplysninger.

### FR-006: Se kontrakt
Systemet skal give en bruger mulighed for at se oplysninger om en registreret kontrakt.

### FR-007: Opdatere kontrakt
Systemet skal give brugeren mulighed for opdatere oplysninger på en registreret kontrakt.

### FR-008: Bevar kontrakthistorik
Systemet skal bevare udløbne kontrakter, så brugeren senere kan tilgå oplysninger om tidligere aftaler.

### FR-032: Forny kontrakt
Systemet skal give brugeren mulighed for at oprette en ny kontrakt på baggrund af en eksisterende kontrakt. Relevante oplysninger fra den eksisterende kontrakt skal kopieres til den nye kontrakt, så brugeren kan genbruge dem ved oprettelsen.

Brugeren skal kunne redigere de kopierede oplysninger, herunder kontraktens datoer, priser, vilkår og kontraktlinjer, inden den nye kontrakt gemmes. Den eksisterende kontrakt skal forblive uændret.

### FR-033: Tilgå tidligere kontrakt
Systemet skal give brugeren mulighed for at tilgå den tidligere kontrakt fra en kontrakt, der er oprettet som led i en fornyelse.

## Katalogelementer

### FR-020: Opret katalogelement
Systemet skal give brugeren mulighed for at oprette et katalogelement, der repræsenterer et generelt produkt eller en service.

### FR-021: Se og søge efter katalogelementer
Systemet skal give brugeren mulighed for at se og søge efter eksisterende katalogelementer.

### FR-022: Opret katalogelement fra kontrakt
Systemet skal give brugeren mulighed for at oprette et nyt katalogelement direkte fra kontraktformularen, hvis det ønskede element ikke allerede findes.

## Kontraktlinjer

### FR-023: Tilføj katalogelement til kontrakt
Systemet skal give brugeren mulighed for at tilføje et eksisterende katalogelement til en kontrakt.

### FR-024: Registrer konkrete produktoplysninger
Systemet skal give brugeren mulighed for at registrere producent og model på en kontraktlinje, når det er relevant, samt de øvrige oplysninger, der er nødvendige for at beskrive det aftalte produkt eller den aftalte service.

### FR-026: Tilføj flere kontraktlinjer
Systemet skal give brugeren mulighed for at tilføje flere kontraktlinjer til samme kontrakt, herunder flere linjer med samme katalogelement.

### FR-027: Registrer leveringsfrekvens
Systemet skal give brugeren mulighed for at angive, hvor ofte et produkt skal leveres, eller en service skal udføres, når det er relevant.

### FR-028: Registrer betalingsvilkår
Systemet skal gøre det muligt at registrere en eventuel engangsbetaling samt tilbagevendende betalinger for hver kontraktlinje. Betalinger skal angives med beløb og relevant betalingsfrekvens. For produkter skal systemet som udgangspunkt understøtte en pris pr. enhed og et antal.

### FR-029: Vis prisoplysninger
Systemet skal beregne og vise relevante prisoplysninger for en kontrakt baseret på dens registrerede betalingsvilkår.

Prisoplysningerne skal, når de er relevante og kan beregnes, omfatte:
- Månedlig betaling for løbende betalinger.
- Årlig pris for løbende betalinger.
- Samlet pris for det første kontraktår, inklusive eventuelle engangsbetalinger.
- Samlet pris for hele kontraktperioden, inklusive eventuelle engangsbetalinger.

For kontrakter uden en fast slutdato skal systemet fortsat vise relevante løbende prisoplysninger. Den samlede pris for hele kontraktperioden skal enten udelades eller vises som ikke tilgængelig.

### FR-030: Rediger kontraktlinjer
Systemet skal give brugeren mulighed for at opdatere oplysninger på en eksisterende kontraktlinje.

### FR-031: Fjern kontraktlinjer
Systemet skal give brugeren mulighed for at fjerne en kontraktlinje fra en kontrakt.

## Søgning og filtrering
### FR-010: Søg efter kontrakt
Systemet skal give brugeren mulighed for at søge en kontrakt frem efter kriterier.

### FR-011: Filtrere kontrakter
Systemet skal give brugeren mulighed for at filtrere kontrakter ud fra relevante kriterier, herunder leverandør, handlingsstatus og årlig pris.

### FR-025: Søg kontrakter efter producent
Systemet skal give brugeren mulighed for at finde kontrakter med produkter fra en bestemt producent, når producenten er registreret på de relevante kontraktlinjer.

## Kontraktoverblik og påmindelser
### FR-012: Se samlet kontraktoverblik
Systemet skal give brugeren mulighed for at se en samlet oversigt over virksomhedens kontrakter med relevante oplysninger, herunder handlingsstatus og prisoplysninger.

### FR-013: Identificer kontrakter, der kræver handling
Systemet skal identificere kontrakter, hvor handlingsdatoen er nået eller overskredet, eller hvor der er registreret en anden uafklaret handling.

### FR-014: Identificer kontrakter, der snart kræver handling
Systemet skal identificere kontrakter, hvis handlingsdato ligger inden for en defineret periode fra dags dato.

### FR-015: Vis årsag til handlingsstatus
Systemet skal vise, hvorfor en kontrakt kræver handling eller snart kræver handling.

### FR-016: Vis påmindelser i systemet
Systemet skal gøre brugeren opmærksom på relevante kontraktfrister via kontraktoverblikket.

### FR-017: Beregn handlingsdato
Systemet skal automatisk beregne en handlingsdato ud fra kontraktens relevante datoer og opsigelsesvarsel, når de nødvendige oplysninger er tilgængelige.

### FR-018: Rediger handlingsdato manuelt
Systemet skal give brugeren mulighed for manuelt at ændre en kontrakts handlingsdato.

### FR-019: Håndter ændringer i kontraktoplysninger
Systemet skal håndtere ændringer i kontraktens datoer og opsigelsesvarsel, så handlingsdatoen afspejler de aktuelle kontraktoplysninger og eventuelle manuelle ændringer.

### FR-035: Markér handling som håndteret
Systemet skal give brugeren mulighed for at markere en uafklaret handling på en kontrakt som håndteret. Systemet skal registrere, hvilken bruger der håndterede handlingen, og hvornår det skete.

### FR-036: Registrer kontrakthandlinger
Systemet skal registrere, hvilken bruger der oprettede en kontrakt, samt hvem der efterfølgende foretager væsentlige handlinger på kontrakten, og hvornår de blev foretaget.

## Sporbarhed og historik

### FR-036: Registrer kontrakthistorik
Systemet skal registrere oprettelse af kontrakter samt væsentlige ændringer og kontraktrelaterede handlinger i en historik. Hver historikpost skal angive medarbejderen, tidspunktet og en beskrivelse af handlingen. For relevante ændringer skal historikken desuden vise de tidligere og nye værdier. Tidligere historikposter må ikke overskrives af senere ændringer.

## Medarbejdere
### FR-037: Vælg medarbejder
Systemet skal gøre det muligt at vælge en medarbejder fra en liste over forudregistrerede medarbejdere i forbindelse med kontraktoprettelse, kontraktændringer og håndtering af kontraktrelaterede handlinger.

# Non-funktionelle krav
### NFR-001: Adgang til kontrakter
Alle medarbejdere i virksomheden skal i første version have samme adgang til at se og administrere virksomhedens kontrakter. Rollebaseret adgangskontrol er ikke en del af første version.

### NFR-002: Sporbarhed
Systemet skal kunne identificere den medarbejder, der udfører kontraktrelaterede handlinger, så oprettelser, ændringer og håndtering af handlinger kan knyttes til en bruger og et tidspunkt.

### NFR-003: Platform

Systemets brugergrænseflade skal i første version være målrettet brug på computer. Understøttelse af mobil og tablet er ikke et krav.

# Forretningsregler

### BR-001: Adskil kontraktstatus og handlingsstatus
En kontrakts aktive eller inaktive status må ikke i sig selv afgøre, om kontrakten kræver handling. Handlingsstatus skal baseres på kontraktens relevante frister, handlingsdato og eventuelle uafklarede handlinger.

### BR-002: Bevar uafklarede handlinger
En kontrakt, der kræver handling, skal forblive i handlingsoverblikket, indtil en medarbejder har håndteret den pågældende handling. En overskredet handlingsdato eller kontraktens udløb må ikke automatisk fjerne kontrakten fra handlingsoverblikket.

### BR-003: Bevar historiske kontraktoplysninger ved fornyelse
Når en kontrakt fornyes, skal den nye kontrakt oprettes som en selvstændig kontrakt. Ændringer i den nye kontrakt må ikke påvirke oplysningerne i den tidligere kontrakt.

### BR-004: Sammenkæd fornyede kontrakter
En kontrakt, der oprettes ved fornyelse, skal referere til den kontrakt, den afløser. Det skal være muligt at navigere mellem kontrakterne i fornyelseskæden.

### BR-005: Håndter overlap mellem fornyede kontrakter
En ny kontrakt må som udgangspunkt ikke træde i kraft, før den tidligere kontrakt er ophørt. Hvis den nye kontrakts ikrafttrædelsesdato ligger før den tidligere kontrakts planlagte slutdato, skal systemet advare brugeren og kræve eksplicit bekræftelse på, at den tidligere kontrakt skal afbrydes.

### BR-006: Afslut tidligere kontrakt ved ikrafttrædelse af fornyelse
Når en fornyet kontrakt træder i kraft, skal den tidligere kontrakt markeres som afsluttet, hvis den har nået sin planlagte slutdato, eller som afbrudt, hvis den afsluttes før denne dato som følge af fornyelsen.

### BR-007: Sporbarhed for kontrakthandlinger
Oprettelse af kontrakter, ændringer af eksisterende kontrakter og håndtering af kontraktrelaterede handlinger skal kunne spores til den bruger, der udførte handlingen, og tidspunktet for handlingen. Oprettelse af leverandører og katalogelementer kræver ikke særskilt registrering af, hvem der oprettede dem.

### BR-008: Kontraktstatus følger kontraktens livscyklus
En kontrakt kan have status Afventer ikrafttrædelse, Aktiv, Afsluttet eller Afbrudt. En kontrakt med fremtidig ikrafttrædelsesdato skal have status Afventer ikrafttrædelse, indtil den træder i kraft. En kontrakt, der afsluttes før sin planlagte slutdato, skal have status Afbrudt. En kontrakts status må ikke i sig selv afgøre, om den har uafklarede handlinger.

### BR-009: Faste priser i kontraktperioden
De registrerede priser og betalingsvilkår for en kontrakt antages at være konstante i kontraktperioden. Systemet skal ikke understøtte automatisk planlagte prisændringer inden for samme kontrakt i første version.




