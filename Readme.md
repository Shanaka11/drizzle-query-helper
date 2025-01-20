# Dynamic Query Filters for Drizzle ORM

This lightweight npm package helps create dynamic query filters when querying data using [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm). It simplifies the process of building complex queries by parsing strings into Drizzle-compatible query methods.

## Features

- **AND / OR Filters**: Currently supports `and` and `or` filters.
- **Equality Operation**: Supports `eq` (equals) / `neq` (not equals) operations.
- **Comparisons**: Supports `lt` (less than) / `lte` (less than or equal) / `gt` (greater than) / `gte` (greater than or equal).
- **Between**: Supports `between` condition.
- **Text Compariosns**: Supports `like`/`not like`/`ilike` (compare while ignoring case)

### Example Usage

```javascript
import { generateDrizzleFilter } from 'drizzle-query-helper';

// Input query string
const queryString = 'and(eq(firstname,john),eq(lastname,doe))';

// Parse to Drizzle query methods
const filter = generateDrizzleFilter(queryString);

// Use the filter in your Drizzle query
const result = await db.select().from(users).where(filter);
```

### How It Works

When you provide a string like:

```plaintext
and(eq(firstname,john),eq(lastname,doe))
```

It is translated into equivalent Drizzle ORM methods to be used in the `where` clause of your queries. This allows for more dynamic and flexible query construction.

```sql
SELECT * FROM <TABLE> WHERE FirstName = 'john' AND LastName = 'doe'
```

## Caveats

Currently, there are a few limitations to be aware of:

1. **No Spaces Allowed**: The filter string cannot contain any spaces. This also means that values cannot have spaces.
2. **Restricted Characters**: Values cannot include the characters `(`, `)`, or `,`.

These limitations will be addressed in future releases.

## SQL Operations and Example Query Strings

| SQL Operation | Example Query String                                                  |
| ------------- | --------------------------------------------------------------------- |
| `=`           | `eq(columnName,value)`                                                |
| `>`           | `gt(columnName,value)`                                                |
| `<`           | `lt(columnName,value)`                                                |
| `>=`          | `gte(columnName,value)`                                               |
| `<=`          | `lte(columnName,value)`                                               |
| `<>`          | `neq(columnName,value)`                                               |
| `like`        | `like(columnName,value)`                                              |
| `ilike`       | `ilike(columnName,value)`                                             |
| `not like`    | `nlike(columnName,value)`                                             |
| `between`     | `between(columnName,value1,value2)`                                   |
| `and`         | `and(eq(columnName,value),eq(columnName,value),eq(columnName,value))` |
| `or`          | `or(eq(columnName,value),eq(columnName,value),eq(columnName,value))`  |

## Future Plans

The following features and improvements are planned:

1. **Dynamic Query Builders**:
   - Add support for dynamically creating `order by` and `group by` clauses.

## Installation

```bash
npm install drizzle-query-helper
```

## Contributions

Contributions are welcome! If you'd like to report a bug, request a feature, or contribute to the codebase, feel free to submit an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE).
