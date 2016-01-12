#!/usr/bin/env python
# coding=utf-8

from bs4 import BeautifulSoup
import time
import urlparse
import urllib

def parse_html(html):
	soup = BeautifulSoup(html, 'lxml')
	dls = soup.find_all('div', attrs={'class': 'live-box'})
	lists = []
	for dl in dls:
		try:
			atag = dl.select('a')
			data = {}
			data['video_id'] = atag[0].attrs['href'].split('link=')[1]
			imgs = dl.find_all('img', attrs={'class': 'none-opacity-img'})
			data['img'] = imgs[0].attrs['src']
			texts = dl.find_all('div', attrs={'class': 'overflow-text'})
			data['title'] = texts[0].text.strip()
			arr = texts[1].text.strip().split()
			data['author'] = arr[0]
			lists.append(data)
		except:
			pass
	return lists