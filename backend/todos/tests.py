from django.test import TestCase
from django.urls import reverse
from todos.models import Task

class TaskModelTests(TestCase):
    def test_str_contains_title(self):
        t = Task.objects.create(title="Buy milk")
        self.assertIn("Buy milk", str(t))

class TaskApiTests(TestCase):
    def test_tasks_list_endpoint_returns_200(self):
        url = reverse("todos:task-list")  
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)