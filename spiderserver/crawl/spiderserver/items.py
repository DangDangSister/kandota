# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class DotamaxItem(scrapy.Item):
    img = scrapy.Field()
    created_at = scrapy.Field()
    updated_at = scrapy.Field()
    tag = scrapy.Field()
    channel = scrapy.Field()
    title = scrapy.Field()
    video_id = scrapy.Field()
    id = scrapy.Field()


class Carry6Item(scrapy.Item):
	img = scrapy.Field()
	created_at = scrapy.Field()
	href = scrapy.Field()
	channel = scrapy.Field()
	title = scrapy.Field()
	text = scrapy.Field()
	id = scrapy.Field()

class A178Item(scrapy.Item):
	img = scrapy.Field()
	created_at = scrapy.Field()
	href = scrapy.Field()
	channel = scrapy.Field()
	title = scrapy.Field()
	text = scrapy.Field()
	id = scrapy.Field() 
