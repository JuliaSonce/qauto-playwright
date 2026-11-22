# Generated spec: Guest adds Audi TT to Garage

Згенеровано з `specs/add-car.md`. Один сценарій, один UI-тест у Chromium.
Усе, чого немає в `specs/add-car.md`, позначено `ASSUMPTION`.

## Вимога-джерело

- `specs/add-car.md` — сценарій, межі та тестові дані.
- `cases/qauto/requirements/add-car.md` — названий у `specs/add-car.md` як джерело
  правил Brand, Model, Mileage та появи авто у Garage.
  - `QUESTION` (для викладача): файл `cases/qauto/requirements/add-car.md`
    відсутній у навчальному проєкті. Де взяти правила Brand / Model / Mileage
    та появи авто у Garage? До відповіді тест спирається лише на `specs/add-car.md`.

## Передумова

- Застосунок відкривається за `baseURL` із `playwright.config.ts`.
- Користувач входить через `Guest log in`; вхід є підготовкою, а не головною перевіркою.
- `ASSUMPTION`: гостьовий профіль стартує з порожнім Garage (без `Audi TT`).
  На CLI inspection знімається snapshot Garage до додавання авто; результат
  (порожній / не порожній) фіксується як `FACT` у run evidence.
- `ASSUMPTION`: HTTP Basic Authentication проходить через `httpCredentials`
  із локального config; у spec, тесті чи evidence значення не з'являються.

## Тестові дані

| Поле | Значення |
|---|---|
| Brand | `Audi` |
| Model | `TT` |
| Mileage | `12000` |

## Кроки

1. Відкрити `baseURL` (`/`).
2. Натиснути `Guest log in`.
3. Відкрити форму `Add car`.
4. Обрати Brand = `Audi`.
5. Обрати Model = `TT`.
6. Ввести Mileage = `12000`.
7. Зберегти форму.

- `ASSUMPTION`: Brand і Model — випадні списки (select), Mileage — текстове/числове поле.
- `ASSUMPTION`: Model стає доступним після вибору Brand.
- `ASSUMPTION`: точна назва кнопки збереження (`Add` / `Save`) невідома;
  підтверджується snapshot.
- Ролі, назви та локатори всіх елементів беруться лише з поточного accessibility
  snapshot; якщо UI їх не підтверджує — `ASSUMPTION` + `STOP`.

## Очікуваний результат

- URL відповідає сторінці Garage.
- У Garage видно запис `Audi TT`.
- `ASSUMPTION`: URL Garage відповідає шаблону `/panel/garage` — узято з
  `tests/guest-garage.spec.ts`, а не з `specs/add-car.md`.
- `ASSUMPTION`: форма `Add car` закривається після збереження; окремо не перевіряється.
- Mileage `12000` у Garage не перевіряється: `specs/add-car.md` цього не вимагає.

## Поза межами

Registration, API-виклики, credentials, Fuel Expenses, редагування/видалення авто,
негативні сценарії та інші браузери.
