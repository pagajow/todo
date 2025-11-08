FROM python:3.13-alpine

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 DJANGO_SETTINGS_MODULE=todo_project.settings PORT=8000

RUN apk add --no-cache bash

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p staticfiles
RUN chmod +x entrypoint.sh

EXPOSE 8000
CMD ["entrypoint.sh"]
