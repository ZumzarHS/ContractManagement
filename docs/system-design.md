# Teknologier
ASP.NET Core, EF Core, SQL Server, React og TypeScript.

Backend skal følge en forenklet Clean Architecture.



# Arkitektur


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