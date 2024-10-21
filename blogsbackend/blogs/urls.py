# backend/blogsbackend/blogs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/posts/', views.get_blogs_view, name='get_blogs'),
    path('api/posts/create/', views.create_blog_view, name='create_blog'),
    path('api/posts/delete/<str:blog_id>/', views.delete_blog_view, name='delete_blog'),
    path('api/posts/update/<str:blog_id>/', views.update_blog_view, name='update_blog'),
]