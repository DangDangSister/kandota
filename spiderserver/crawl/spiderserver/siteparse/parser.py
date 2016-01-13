#!/usr/bin/env python
# coding=utf-8

from bs4 import BeautifulSoup
import moment
import md5

def parse_dotamax_html(html):
	soup = BeautifulSoup(html, 'lxml')
	dls = soup.find_all('div', attrs={'class': 'live-box'})
	items = []
	for dl in dls:
		try:
			atag = dl.select('a')
			data = {}
			data['video_id'] = atag[0].attrs['href'].split('link=')[1]
			data['id'] = md5.new(data['video_id']).hexdigest()
			imgs = dl.find_all('img', attrs={'class': 'none-opacity-img'})
			data['img'] = imgs[0].attrs['src']
			texts = dl.find_all('div', attrs={'class': 'overflow-text'})
			data['title'] = texts[0].text.strip()
			arr = texts[1].text.strip().split()
			data['author'] = arr[0]
			if arr[2]:
				if arr[2].find('hour') >= 0:
					data['created_at'] = moment.now().subtract(hours=int(arr[1])).format('YYYY-M-DThh:mm:ss')
				if arr[2].find('minute') >= 0:
					data['created_at'] = moment.now().subtract(minutes=int(arr[1])).format('YYYY-M-DThh:mm:ss')
				if arr[2].find('year') >= 0:
					data['created_at'] = moment.now().subtract(years=int(arr[1])).format('YYYY-M-DThh:mm:ss')
				if arr[2].find('month') >= 0:
					data['created_at'] = moment.now().subtract(months=int(arr[1])).format('YYYY-M-DThh:mm:ss')
				if arr[2].find('day') >= 0:
					data['created_at'] = moment.now().subtract(days=int(arr[1])).format('YYYY-M-DThh:mm:ss')
				if arr[2].find('second') >= 0:
					data['created_at'] = moment.now().subtract(seconds=int(arr[1])).format('YYYY-M-DThh:mm:ss')
			data['update_at'] = moment.now().format('YYYY-M-DThh:mm:ss')
			items.append(data)
		except:
			pass
	return items

def parse_carry6_html(html):
	soup = BeautifulSoup(html, 'lxml')
	dls = soup.find_all('div', attrs={'class': 'container_list'})
	items = []
	for dl in dls:
		try:
			data = {}
			atag = dl.find('a', attrs={'class': 'list_pic'})
			data['href'] = atag.attrs['href']
			data['id'] = md5.new(data['href']).hexdigest()
			data['title'] = atag.attrs['title']
			itemtag = dl.find('div', attrs={'class': 'items-info'})
			btag = itemtag.find_all('b')
			data['author'] = btag[0].text
			data['created_at'] = moment.date(btag[1].text, 'YY-MM-DD').format('YYYY-MM-DDThh:mm:ss')
			data['text'] = dl.find('p').text
			items.append(data)
		except Exception, e:
			raise
		else:
			pass
		finally:
			pass
	return items

def parse_178_html(html):
	soup = BeautifulSoup(html, 'lxml')
	dls = soup.find_all('div', attrs={'class': 'list-section'})
	items = []
	for dl in dls:
		try:
			data = {}
			simgtag = dl.find('div', attrs={'class': 'list-section-image'})
			if simgtag:
				data['img'] = simgtag.find('a').attrs['href']
			ctag = dl.find('div', attrs={'class': 'list-section-contents'})
			if ctag:
				htag = ctag.find('h2')
				atag = htag.find('a')
				data['href'] = atag.attrs['href']
				data['id'] = md5.new(data['href']).hexdigest()
				data['title'] = atag.attrs['title']
				data['created_at'] = moment.date(ctag.find('h5').text.split('.')[0], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDThh:mm:ss')
				data['text'] = ctag.find('p').text
				items.append(data)
		except Exception, e:
			raise
		else:
			pass
		finally:
			pass
	return items
