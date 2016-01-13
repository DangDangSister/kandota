# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor

class A178spiderSpider(scrapy.Spider):
    name = "178spider"
    allowed_domains = ["dota2.178.com"]
    start_urls = (
        'http://dota2.178.com/list/interview.html/',
    )

    rules = (
        Rule(SgmlLinkExtractor(allow = r'http://dota2.178\.com/list/\d+'), callback = 'parse'),
    )

    def parse(self, response):
        pass
