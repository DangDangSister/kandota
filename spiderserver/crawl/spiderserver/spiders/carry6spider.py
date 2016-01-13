# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor

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

    def parse(self, response):
        print response.body
