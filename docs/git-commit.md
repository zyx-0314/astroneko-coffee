# Rules for Committing and Version Control

## Commit Types
| Type      | Usage                                                                 | Remarks |
|-----------|----------------------------------------------------------------------|---------|
| `docs`    | For documentation changes such as added comments, footer notes, or markdown files. |         |
| `feat`    | For adding new logic, content sections, features, pages, APIs, etc.  |         |
| `refactor`| For modifying code, such as updating, deleting unnecessary files, optimizing code, renaming files or directories, and general polishing. |         |
| `fix`     | For fixing specific issues.                                           |         |

## Rules
- **Type** should always be in lowercase.
- **Format**:
    - **type**: (required) The type of commit.
    - **affected**: (optional) The affected functionality, such as security, API group or specific API, page or section, component, etc. This is a collective summary group of changes.
    - **summary**: (required) A short summary of what is done in this commit.
    - **target functionality**: (required) This is the body section, where the specific affected functionality is stated. It can be a group or a single component.
    - **explanation**: (required) A detailed explanation of what was done.

### Commit Message Template
```
<type>(<affected>): <summary>

- <target functionality>: <explanation>
- <target functionality>: <explanation>
- <target functionality>: <explanation>
```

### Example
```
feat(authentication): Add login functionality

- Login page: Implemented UI for the login page.
- Backend API: Added API endpoint for user authentication.
- Error handling: Improved error messages for failed login attempts.
```

---

### Additional Examples

#### Documentation Update:
```
docs(readme): Update project structure and installation steps

- README.md: Added detailed project structure.
- README.md: Updated installation steps for clarity.
```

#### Bug Fix:
```
fix(api): Resolve issue with order creation endpoint

- POST /api/v1/orders: Fixed validation for missing fields.
- OrderService: Added null checks for optional parameters.
```

#### Feature Addition:
```
feat(menu): Add support for dynamic menu categories

- MenuController: Added endpoints for category-based filtering.
- MenuService: Implemented logic for dynamic category retrieval.
- Frontend: Updated menu page to support category selection.
```
