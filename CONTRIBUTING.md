## Git

- make sure Git Hooks installed. It will be install with `pnpm bootstrap`. Otherwise, you can run

```console
pnpm prepare
```

- Commit messages should follow [these rules](https://cbea.ms/git-commit):
  - Separate subject from body with a blank line
  - Limit the subject line to 50 characters
  - Capitalize the subject line
  - Do not end the subject line with a period
  - Use the imperative mood in the subject line
  - Wrap the body at 72 characters
  - Use the body to explain what and why vs. how
- Must fix linting and formatting errors before commiting

## Code

- Server folder stucture follows component bases grouping
  - `[component]-controller.ts`
  - `[component]-model.ts`
  - `[component]-scheme.ts`
  - `[component]-schema.ts`, for API payload schema
- Must add API payload schema validation using `ajv` in `[component]-schema.ts`

### Types

- If types are added realted too communication between _web_ and _server_, add the type at `app/server/src/api-types/` and reuse in _web_ and _server_ by importing from `@api-types`
- If all types are imported from `@api-types`, import like `import * as T from '@api-types/messages` and use as `T.Message`
- If specific type(s) is imported from `@api-types`, import by appeding the type name alias with `T`
  - `import {Message as MessagesT} from '@api-types/messages`
