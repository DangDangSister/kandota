#!/usr/bin/env python
# coding=utf-8

from bs4 import BeautifulSoup
import moment

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
			print arr[2], int(arr[1]), moment.now().format('YYYY-M-D hh:mm:ss')
			if arr[2]:
				if arr[2].find('hour') >= 0:
					data['created_at'] = moment.now().subtract(hours=int(arr[1])).format('YYYY-M-D hh:mm:ss')
				if arr[2].find('minute') >= 0:
					data['created_at'] = moment.now().subtract(minutes=int(arr[1])).format('YYYY-M-D hh:mm:ss')
				if arr[2].find('year') >= 0:
					data['created_at'] = moment.now().subtract(years=int(arr[1])).format('YYYY-M-D hh:mm:ss')
				if arr[2].find('month') >= 0:
					data['created_at'] = moment.now().subtract(months=int(arr[1])).format('YYYY-M-D hh:mm:ss')
				if arr[2].find('day') >= 0:
					data['created_at'] = moment.now().subtract(days=int(arr[1])).format('YYYY-M-D hh:mm:ss')
				if arr[2].find('second') >= 0:
					data['created_at'] = moment.now().subtract(seconds=int(arr[1])).format('YYYY-M-D hh:mm:ss')
			data['update_at'] = moment.now().format('YYYY-M-D hh:mm:ss')
			lists.append(data)
		except:
			pass
	return lists