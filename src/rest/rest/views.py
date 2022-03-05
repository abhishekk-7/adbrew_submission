from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import logging
import os
from pymongo import MongoClient

# mongo_uri = 'mongodb://' + \
#     os.getenv("MONGO_HOST") + ':' + os.environ["MONGO_PORT"]
mongo_uri = 'mongodb://localhost:27017'
db = MongoClient(mongo_uri)['test_db']


class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        tasks = []
        for doc in db.collection.find():
            try:
                tasks.append({"task": doc["task"]})
            except KeyError:
                pass

        return Response(tasks, status=status.HTTP_200_OK)

    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        # db.collection.insert({"task": request.data['task']})
        db.collection.insert_one({"task": request.data['task']})

        return Response({}, status=status.HTTP_200_OK)
