# Dynamic Query Filters for Drizzle ORM

This lightweight npm package helps create dynamic query filters when querying data using [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm). It simplifies the process of building complex queries by parsing strings into Drizzle-compatible query methods.

## Features

- **AND / OR Filters**: Currently supports `and` and `or` filters.
- **Equality Operation**: Supports `eq` (equals) operation.

### Example Usage

```javascript
const { generateDrizzleFilter } = require('dynamic-query-filters');

// Input query string
const queryString = 'and(eq(firstname,john),eq(lastname,doe))';

// Parse to Drizzle query methods
const filter = parseFilter(queryString);

// Use the filter in your Drizzle query
const result = await db.select().from(users).where(filter);
```

### How It Works

When you provide a string like:

```plaintext
and(eq(firstname,john),eq(lastname,doe))
```

It is translated into equivalent Drizzle ORM methods to be used in the `where` clause of your queries. This allows for more dynamic and flexible query construction.

## Future Plans

The following features and improvements are planned:

1. **Add Tests**: Ensure 100% test coverage for the package.
2. **Support Additional SQL Operations**: Include operations such as:
   - `include`
   - `not include`
   - `greater than`
   - `less than`
   - And the rest of the SQL filters provided by Drizzle ORM.
3. **Dynamic Query Builders**:
   - Add support for dynamically creating `order by` and `group by` clauses.

## Installation

```bash
npm install dynamic-query-filters
```

## Contributions

Contributions are welcome! If you'd like to report a bug, request a feature, or contribute to the codebase, feel free to submit an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE).
