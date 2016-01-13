# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from spiderserver.siteparse.parser import parse_178_html
from scrapy.http import Request
from spiderserver.items import A178Item

class A178spiderSpider(scrapy.Spider):
    name = "178spider"
    allowed_domains = ["dota2.178.com"]
    start_urls = (
        'http://dota2.178.com/list/interview.html',
    )
    page = 1
    rules = (
        Rule(SgmlLinkExtractor(allow = r'http://dota2.178\.com/list/\d+'), callback = 'parse'),
    )

    def parse(self, response):
        items = parse_178_html(response.body)
        for item in items:
        	item['channel'] = '178'
        	d = A178Item()
        	d = item
        	yield d

        if len(items) and self.page <= 30:
        	self.page += 1
        	base = 'http://dota2.178.com/list/'
        	href = "%sinterview_%s.html" % (base, self.page)
        	yield Request(url=href, cookies={}, callback=self.parse, errback=self.parse_fail)

    def parse_fail(self, response):
    	pass