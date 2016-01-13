# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from spiderserver.siteparse.parser import parse_carry6_html
from scrapy.http import Request
from spiderserver.items import Carry6Item

class Carry6spiderSpider(scrapy.Spider):
    name = "carry6spider"
    allowed_domains = ["carry6.com"]
    start_urls = (
        'http://www.carry6.com/dota2/new/',
        'http://www.carry6.com/dota2/zhantilist/',
    )
    rules = (
        Rule(SgmlLinkExtractor(allow = r'http://carry6\.com/dota2/\d+'), callback = 'parse'),
    )
    page = 1

    def parse(self, response):
        items = parse_carry6_html(response.body)
        for item in items:
        	d = Carry6Item()
        	item['channel'] = 'carry6'
        	d = item
        	yield d
        if len(items) and self.page < 20:
        	for u in self.start_urls:
        		self.page = self.page + 1
        		href = "%sindex_%s.html" % (u, self.page)
        		yield Request(url=href, cookies={}, callback=self.parse, errback=self.parse_fail)
    
    def parse_fail(self, response):
    	pass