import os
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client.get_database()

def create_blog(author_name, email_address, blog_content):
    blog = {
        "author_name": author_name,
        "email_address": email_address,
        "blog_content": blog_content,
        "created_at": datetime.datetime.utcnow()
    }
    result = db.blogs.insert_one(blog)
    return result.inserted_id

def get_blogs():
    blogs = list(db.blogs.find())
    for blog in blogs:
        blog['_id'] = str(blog['_id'])  # Convert ObjectId to string
    return blogs

def update_blog(blog_id, author_name, email_address, blog_content):
    query = {"_id": ObjectId(blog_id)}
    new_values = {"$set": {
        "author_name": author_name,
        "email_address": email_address,
        "blog_content": blog_content
    }}
    db.blogs.update_one(query, new_values)

def delete_blog(blog_id):
    query = {"_id": ObjectId(blog_id)}
    db.blogs.delete_one(query)