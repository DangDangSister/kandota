# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.http import Request
import spiderserver.lib.utils as utils
from spiderserver.siteparse.parser import parse_youku_html
from spiderserver.items import YoukuItem


class YoukuSpider(scrapy.Spider):
    name = "youkuspider"
    allowed_domains = ["youku.com"]
    start_urls = []
    page = 1
    download_delay = 2

    def start_requests(self):
    	(start_urls, users) = utils.getYoukuUrls()
    	self.users = users
    	for url in start_urls:
        	yield self.make_requests_from_url(url)

	def make_requests_from_url(self, url):
		return Request(url, dont_filter=True)

    def parse(self, response):
        items = parse_youku_html(response.body)
        for item in items:
        	item['channel'] = 'youku'
        	for o in self.users:
        		if response._url.find(o['id']) >= 0:
        			item['author'] = o['name']
        			item['avtar'] = o['avtar']
        			item['uid'] = o['id']
        			break
        	d = YoukuItem()
        	d = item
        	yield d

        if not len(items):
        	return
        self.page = self.page + 1
        for o in self.users:
			uri = "http://i.youku.com/u/%s/videos/fun_ajaxload/?__rt=1&__ro=&v_page=1&page_num=%s&page_order=1&q=&last_str=" % (o['id'], self.page)
			yield Request(url=uri, cookies={}, callback=self.parse, errback=self.parse_fail)

    def parse_fail(self, response):
        pass