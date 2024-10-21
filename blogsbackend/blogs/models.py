from django.db import models

class Blog(models.Model):
    author_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    email_address = models.EmailField()
    blog_content = models.TextField()

    def __str__(self):
        return self.author_name
