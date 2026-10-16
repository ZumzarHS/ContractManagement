# Arkitektur

## Projektstruktur

Backend organiseres som fire separate C#-projekter i samme .NET solution. Arkitekturen følger en forenklet Clean Architecture, hvor hvert projekt har et tydeligt ansvar, og afhængighederne mellem projekterne begrænses.

Frontend udvikles separat med React og TypeScript og kommunikerer med backend gennem et HTTP-baseret API.

Den planlagte mappestruktur er:

```text
ContractManagement/
├── docs/
│   ├── requirements.md
│   ├── system-design.md
│   └── diagrams/
├── src/
│   ├── ContractManagement.Domain/
│   ├── ContractManagement.Application/
│   ├── ContractManagement.Infrastructure/
│   └── ContractManagement.Api/
├── tests/
│   ├── ContractManagement.Domain.Tests/
│   └── ContractManagement.Application.Tests/
└── ContractManagement.sln
```

Frontend placeres i en separat mappe, når den grundlæggende backendstruktur er etableret.

### Domain
Indeholder systemets centrale entiteter og forretningsregler. Det omfatter blandt andet regler for kontraktdatoer, kontraktstatus og fornyelse af kontrakter.

Domain er uafhængigt af database, API og brugergrænseflade.

### Application
Indeholder systemets use cases og applikationslogik, som koordinerer handlinger såsom oprettelse, redigering, fornyelse og afslutning af kontrakter.

Application afhænger af Domain og kan definere interfaces til funktionalitet, som leveres af eksterne tekniske komponenter.

### Infrastructure
Indeholder de tekniske implementeringer, herunder databasetilgang med Entity Framework Core og SQL Server.

Infrastructure implementerer de nødvendige eksterne funktioner og interfaces, som defineres af de indre lag, og afhænger af disse efter behov.
### Api

Indeholder backendens HTTP-endpoints, håndtering af requests og responses samt konfiguration af dependency injection.

API'et modtager forespørgsler fra frontend, kalder relevante use cases i Application og konfigurerer de tekniske implementeringer fra Infrastructure ved opstart.

### Afhængigheder mellem projekter
Afhængighederne organiseres efter principperne i Clean Architecture:

- **Domain** har ingen afhængigheder til de øvrige projekter.
- **Application** afhænger af Domain.
- **Infrastructure** afhænger af de indre lag, når det er nødvendigt for at implementere deres interfaces og funktionalitet.
- **Api** afhænger af Application og Infrastructure for at håndtere requests og sammensætte applikationen ved opstart.

Afhængighederne skal pege ind mod systemets forretningskerne, så forretningsreglerne ikke bliver bundet til bestemte teknologier.

Formålet er at holde ansvarsområder adskilt og gøre systemet lettere at teste, vedligeholde og udvide.

# Datamodel
## Entiteter
### Supplier
**Attributer:**
- SupplierId (PK)
- Name
- Address
- CVR
- ContactPerson - nullable
- Email - nullable
- PhoneNumber - nullable
- Status

**Formål:**
Repræsenterer en leverandør, som virksomheden har eller har haft kontrakter med. Indeholder leverandørens stamdata, kontaktoplysninger og status. En leverandør kan være knyttet til flere kontrakter, og leverandørens oplysninger og kontrakthistorik bevares, selvom leverandøren markeres som inaktiv.

### Contract
**Attributer:**
- ContractId (PK)
- SupplierId (FK)
- Title
- Description - nullable
- StartDate
- EndDate - nullable
- ActionDate - nullable
- NoticePeriodValue - nullable
- NoticePeriodUnit - nullable
- ContractStatus
- ActionStatus
- PreviousContractId (FK) - nullable

**Formål:**
Repræsenterer en kontrakt, som virksomheden har indgået med én leverandør. Indeholder kontraktens titel, en eventuel beskrivelse samt start- og slutdato. Indeholder desuden kontraktens opsigelsesvilkår og en handlingsdato, der angiver, hvornår medarbejderen skal tage stilling til kontrakten. Kontraktens status beskriver dens aktuelle livscyklus, mens handlingsstatus angiver, om der kræves en handling fra en medarbejder. Hvis kontrakten er oprettet som led i en fornyelse, kan den referere til den tidligere kontrakt.


### ContractLine
**Attributer:**
- ContractLineId (PK)
- ContractId (FK)
- CatalogItemId (FK)
- Producer - nullable
- Model - nullable
- Price
- Quantity - nullable
- Description - nullable
- DeliveryFrequency - nullable
- PaymentFrequency
- InitialAmount - nullable

**Formål:**
Repræsenterer et konkret produkt eller en ydelse, der indgår i en kontrakt. Refererer til en generel produkt- eller ydelseskategori via CatalogItemId og indeholder kontraktspecifikke oplysninger såsom producent, model, beskrivelse, pris, antal og betalingsvilkår. Prisen angiver beløbet pr. enhed pr. betalingsperiode for produkter eller beløbet pr. betalingsperiode for ydelser. En eventuel engangsbetaling ved opstart registreres separat. Samlede priser beregnes af systemet ud fra de registrerede oplysninger og gemmes ikke særskilt.

### CatalogItem
**Attributer:**
- CatalogItemId (PK)
- Name
- Type
- Description - nullable

**Formål:**
Repræsenterer en generel produkt- eller ydelseskategori, der kan knyttes til en ContractLine. Navnet angiver, hvilket produkt eller hvilken ydelse der er tale om, mens typen angiver, om der er tale om et produkt eller en service. En valgfri beskrivelse kan bruges til at uddybe kategorien.

### Employee
**Attributer:**
- EmployeeId (PK)
- Name
- Email

**Formål:**
Repræsenterer en medarbejder i virksomheden. Bruges til at registrere, hvilken medarbejder der har oprettet eller ændret en kontrakt, eller som har håndteret en kontraktrelateret handling. Medarbejderen vælges fra en liste over registrerede medarbejdere.

### ContractHistory
**Attributer:**
- ContractHistoryId (PK)
- ContractId (FK)
- EmployeeId (FK)
- Timestamp
- ActionType
- Description - nullable
- OldValue (JSON) - nullable 
- NewValue (JSON) - nullable

**Formål:**
Registrerer historikken for en kontrakt, herunder oprettelse, væsentlige ændringer og håndtering af kontraktrelaterede handlinger. Hver historikpost knyttes til den relevante kontrakt og registrerer, hvilken medarbejder der udførte handlingen, samt dato og tidspunkt for hændelsen. Ved ændringer gemmes de relevante tidligere og nye værdier i JSON-format, så flere ændringer kan samles i én historikpost. En valgfri beskrivelse giver medarbejderen mulighed for at tilføje yderligere kommentarer. Historikposter bevares og overskrives ikke.

## Relationer
Supplier (1:N) Contract
Contract (1:N) Contract
Contract (1:N) ContractLine
CatalogItem (1:N) ContractLine 
Employee (1:N) ContractHistory
Contract (1:N) ContractHistory

