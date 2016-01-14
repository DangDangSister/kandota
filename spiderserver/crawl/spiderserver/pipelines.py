# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from elasticsearch import Elasticsearch
import settings


class SpiderserverPipeline(object):
	def __init__(self):
	 	self.es = Elasticsearch(settings.ES_HOST)

	def process_item(self, item, spider):
		type = 'news'
		if item.has_key('video_id') or item.has_key('uid'):
			type = 'video'
		self.es.index(index=settings.ES_INDEX, doc_type=type, id=item['id'], body=item)