# Используем образ Node.js
FROM node:22.5.1-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Указываем порт, который будет использоваться приложением
EXPOSE 3500

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]