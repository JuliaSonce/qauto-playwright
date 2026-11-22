# Run evidence

- Tool: Claude Code extension for VS Code, Claude account sign-in
- Command: `npx playwright test tests/add-car.spec.ts --project=chromium` (запуск із `playwright-starter/`)
- Timestamp: `2026-11-22T12:51:01+01:00` (час створення evidence; запуск виконано безпосередньо перед цим, ~12:49–12:51)
- Environment: `macOS 15.7.3 (arm64), Playwright Chromium, https://qauto.forstudy.space`
- Actual:

```
Running 1 test using 1 worker
  ✓  1 [chromium] › tests/add-car.spec.ts:5:5 › guest adds Audi TT to Garage (1.7s)
  1 passed (2.2s)
```

| Елемент | Джерело |
|---|---|
| setup | `baseURL` із `playwright.config.ts`; `getByRole('button', { name: 'Guest log in' })` — Playwright CLI, сесія `hw01`, ref `e30` → generate-locator |
| locator/action | Playwright CLI, сесія `hw01`: `Add car` (`e122`), `dialog` (`e138`), `Brand` (`e149`), `Model` (`e152`), `Mileage` spinbutton (`e156`), `Add` (`e161`) → generate-locator; дані `Audi` / `TT` / `12000` — `specs/add-car.md` |
| assertions | `toHaveURL(/panel\/garage/)` — `tests/guest-garage.spec.ts` + URL з inspection (`/panel/garage`); `Audi TT` у `listitem` Garage — `specs/add-car.md`, snapshot після `Add` (`listitem e175`, `paragraph e183`) |

- FACTS:
  - Garage до додавання авто був порожній: snapshot показав `You don’t have any cars in your garage`, без жодного `listitem`.
  - Тест пройшов з першої спроби (`1 passed`), без retry.
  - Вивід запуску надано людиною дослівно; запуск виконано з оригінальним `playwright.config.ts` зі starter.
  - Spec: `specs/generated-add-car.md` (згенеровано з `specs/add-car.md`).
- ASSUMPTIONS:
  - Toast `Car added` і пробіг `12000` у картці авто не перевіряються — `specs/add-car.md` цього не вимагає.
- RISKS:
  - `Audi` і `TT` вибрані у формі за замовчуванням: якщо вибір у select зламається, тест цього не помітить. `toHaveValue` не додано, бо value у select може бути ID, а це не перевірено на inspection.
  - URL `/panel/garage` однаковий до і після додавання авто, тому `toHaveURL` сам по собі не доводить збереження; основна перевірка — `Audi TT` у `listitem`.
- QUESTIONS:
  - (для викладача) `specs/add-car.md` посилається на `cases/qauto/requirements/add-car.md` як на джерело правил Brand / Model / Mileage, але цього файлу немає в навчальному проєкті. Де взяти ці правила?
- HUMAN CORRECTION:
  - Назва CLI-сесії `hw01` замість `lecture07`.
  - Зупинка після `close` для погодження локаторів (`APPROVE LOCATORS`) до створення тесту.
  - Кнопка збереження: `dialog.getByRole('button', { name: 'Add', exact: true })`.
  - Перевірка `Audi TT` у межах `listitem` Garage, а не по всій сторінці.
  - `toHaveValue` для select не додано.
  - `playwright.config.ts` відновлено з оригінального starter. Попередня сесія Claude змінила шлях на `resolve(__dirname, ...)`, бо тест запускали з батьківської папки; зміна не потрібна — тест запускається з `playwright-starter/`.
- DECISION: `ACCEPT` — тест відповідає `specs/add-car.md`, фактичний результат `1 passed`.
