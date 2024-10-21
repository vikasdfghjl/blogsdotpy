from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .mongo_utils import create_blog, get_blogs, update_blog, delete_blog
import json

def index(request):
    return HttpResponse("Backend is running")

@csrf_exempt
def create_blog_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        blog_id = create_blog(
            author_name=data['author_name'],
            email_address=data['email_address'],
            blog_content=data['blog_content']
        )
        return JsonResponse({'id': str(blog_id)})

@csrf_exempt
def delete_blog_view(request, blog_id):
    if request.method == 'DELETE':
        delete_blog(blog_id)
        return JsonResponse({'status': 'deleted'})

def get_blogs_view(request):
    blogs = get_blogs()
    return JsonResponse(blogs, safe=False)

@csrf_exempt
def update_blog_view(request, blog_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        update_blog(
            blog_id=blog_id,
            author_name=data['author_name'],
            email_address=data['email_address'],
            blog_content=data['blog_content']
        )
        return JsonResponse({'status': 'updated'})