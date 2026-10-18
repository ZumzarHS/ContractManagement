# Development Commands

Useful commands for developing and maintaining ContractManagement.

## Entity Framework Core

Run the following commands from the repository root.

### Create a migration

Create a new migration based on changes to the entity model or EF Core configurations.

```powershell
dotnet ef migrations add <MigrationName> --project src/Infrastructure --startup-project src/Api --output-dir Persistence/Migrations
```

Example:

```powershell
dotnet ef migrations add AddContractIndexes --project src/Infrastructure --startup-project src/Api --output-dir Persistence/Migrations
```

### Apply migrations to the database

Apply pending migrations to the configured database.

```powershell
dotnet ef database update --project src/Infrastructure --startup-project src/Api
```

### List migrations

List the migrations in the project and their status.

```powershell
dotnet ef migrations list --project src/Infrastructure --startup-project src/Api
```

### Remove the latest migration

Remove the latest migration if it has not been applied to the database.

```powershell
dotnet ef migrations remove --project src/Infrastructure --startup-project src/Api
```

**Important:** If a migration has already been applied to a shared or production database, do not remove it casually. Create a new migration to correct the schema instead.

## General .NET commands

### Build the solution

```powershell
dotnet build
```

### Run tests

```powershell
dotnet test
```

### Run the API

```powershell
dotnet run --project src/Api
```

## Notes

- Run commands from the repository root unless stated otherwise.
- Review generated migrations before applying them.
- Commit model/configuration changes and their corresponding migration together.
- Never commit passwords, secrets, or production connection strings.
