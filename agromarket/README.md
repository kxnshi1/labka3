# АгроМаркет — Лабораторная работа №2

Витрина товаров, данные загружаются через `fetch` с локального `json-server`.

## Запуск

1. Установить зависимости не нужно — json-server запускается через npx:
   ```
   npx --yes json-server@0.17.4 --watch db.json --port 3001
   ```
2. Открыть `index.html` через Live Server (VS Code).

Проверить данные напрямую можно по адресу: http://localhost:3001/products

## Что сделано

- Товары не захардкожены в HTML — загружаются через `fetch` из `db.json` (json-server).
- Карточки товаров создаются динамически через DOM (`renderProducts`).
- Счётчик корзины в шапке увеличивается при клике на «В корзину».
- Если json-server не запущен — вместо белого экрана выводится сообщение об ошибке (try/catch).

## Git

```
git init
git add .
git commit -m "lab2: динамическая загрузка товаров через fetch + json-server"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/agromarket.git
git push -u origin main
```
