from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import TaskViewSet
from rest_framework.schemas import get_schema_view

app_name = "todos"

schema_view = get_schema_view(
    title="todos API",
    version="1.0.0",
    description="OpenAPI schema for the todos app",
)

router = SimpleRouter() 
router.register("tasks", TaskViewSet, basename="task")
urlpatterns = [
    path("", include(router.urls)),
    path("schema/", schema_view, name="openapi-schema"),
]