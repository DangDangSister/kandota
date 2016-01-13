# -*- coding: utf-8 -*-
import scrapy
from spiderserver.siteparse.parser import parse_dotamax_html
from scrapy.http import Request
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from spiderserver.items import DotamaxItem

class DotamaxSpider(scrapy.Spider):
    name = "dotamaxspider"
    allowed_domains = (
        "dotamax.com",
    )
    start_urls = (
        'http://dotamax.com/video/users/',
    )
    rules = (
        Rule(SgmlLinkExtractor(allow = r'http://dotamax\.com/video/users\d+'), callback = 'parse'),
    )
    page = 1
    download_delay = 2

    def parse(self, response):
        lists = parse_dotamax_html(response.body)
        tag = 'dota'
        if response._url.find('dota2') >= 0:
            tag = 'dota2'
        for l in lists:
            l['tag'] = tag
            l['channel'] = 'dotamax'
            item = DotamaxItem()
            item = l
            yield item

        if len(lists) > 0 and self.page < 900:
            self.page = self.page + 1
            base = 'http://dotamax.com/video/users/'
            for o in ['dota', 'dota2']:
                href = "%s%s?type=&dm_uid=&p=%s" % (base, o, self.page)
                yield Request(url=href, cookies={}, callback=self.parse, errback=self.parse_fail)
    
    def parse_fail(self, response):
        pass