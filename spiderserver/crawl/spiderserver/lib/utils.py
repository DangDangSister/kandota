# -*- coding: utf-8 -*-

def getYoukuUrls():
	users = [{
		"id": "UNDI1NTMxMjMy",
		"name": "Dota情书",
		"avtar": "http://g4.ykimg.com/0130391F484F82790BC834065745D82FDF80F2-9C8B-5C1D-8CD2-E6E677EF6F70"
	}, {
		"name": "伍声2009",
		"id": "UMzE2OTY2NjUy",
		"avtar": "http://g1.ykimg.com/0130391F484CF4FDE0385104B921BF01310A93-BED8-1325-7DA6-6B5C0DD32DBA"
	}, {
		"name": "GuAi小乖",
		"id": "UNTA3ODY5NzUy",
		"avtar": "http://g4.ykimg.com/0130391F455237A09F3F5907915E8E53B0C493-3F42-FC86-970D-C033524EFB10"
	}, {
		"name": "卜严骏Pis",
		"id": "UMzcyMTMxODQ4",
		"avtar": "http://g1.ykimg.com/0130391F455330065C9E62058B9202379E7BF8-BA93-B037-03FB-FB1B24C3742B"
	}, {
		"name": "狗头神教牛蛙",
		"id": "UMzYwNTg1NjI0",
		"avtar": "http://g2.ykimg.com/0130391F4551FB5151EDBB055F86667430A5B2-120F-123C-4585-6E02F0BAC903"
	}, {
		"name": "superhebefans",
		"id": "UNjM3ODczNjA=",
		"avtar": "http://g4.ykimg.com/0130391F455393E94B388400F354583A5D56BD-9C18-6CC0-C945-B2BE6D61559C"
	}, {
		"name": "满楼都素我的人",
		"id": "UMjU3MzI2NDMy",
		"avtar": "http://g4.ykimg.com/0130391F45552112C35A8503D59F58DF115716-DDA8-9F44-FEB5-8E56BA662E0A"
	}, {
		"name": "张登溶_nada",
		"id": "UNjAzOTE5NTI=",
		"avtar": "http://g3.ykimg.com/0130391F4855198EC2D9FC00E660843F8099F5-D77E-82E3-9C78-FFBA9D0F8B94"
	}, {
		"name": "舞ル灬",
		"id": "UMzIzOTQwMTg0",
		"avtar": "http://g2.ykimg.com/0130391F4555F2E235DD2F04D3BBD63558B3B3-C813-03E6-B20E-4AD4123F71DD"
	}, {
		"name": "Esports海涛",
		"id": "UMTcxMzI3OTE2",
		"avtar": "http://g4.ykimg.com/0130391F4553FA2FC7BB03028D906BF1F0EE75-8D21-BE77-BD97-78E674ACBD3A"
	}, {
		"name": "OB战队视频",
		"id": "UMTI4MzY3NDcwOA==",
		"avtar": "http://g4.ykimg.com/0130391F455218E82FE5731320D495B35CE123-EC21-D091-879E-C252F325DFE6"
	}, {
		"name": "西瓦幽鬼",
		"id": "UNDM5NzQ4MjQ4",
		"avtar": "http://g2.ykimg.com/0130391F4554133DD11CEF068D81A6CA239FBC-58BC-6B61-C195-1D12E5118590"
	}, {
		"name": "【剑雪封喉】",
		"id": "UMzA1OTQ5NjY0",
		"avtar": "http://static.youku.com/user/img/avatar/310/29.jpg"
	}, {
		"name": "Kevinnnnnnnnnnn",
		"id": "UMzcxMDA5OTI4",
		"avtar": "http://g1.ykimg.com/0130391F4853E0FB40D3A805874A627D6D1E71-31F0-3226-5635-2EE5859114C3"
	}, {
		"name": "老鼠sjq",
		"id": "UNDM0NTE0MzMy",
		"avtar": "http://g1.ykimg.com/0130391F484F95D900E16406798A67FCE3E132-F501-2F36-3FE7-1F5E83A4603E"
	}, {
		"name": "DOTA2领秀",
		"id": "UNjUzMTI1NjQ=",
		"avtar": "http://g1.ykimg.com/0130391F4555B330F88ACF00F925CD9BCA7C12-1B6B-99F5-CD35-492EEC0111E6"
	}, {
		"name": "Imba_TV",
		"id": "UMTQ5OTEzNjU1Ng==",
		"avtar": "http://g1.ykimg.com/0130391F4554C273D0D5571656C08BAEA0004D-5C97-B188-C735-8B0D1C71541D"
	}, {
		"name": "LGD-GAMING",
		"id": "UNTk1NDQzNzY4",
		"avtar": "http://g4.ykimg.com/0130391F4855237A67150608DF700E27F64B77-DDA3-B597-DA03-DACC466674A2"
	}, {
		"name": "老党Haibara",
		"id": "UMzE5OTMwMjky",
		"avtar": "http://g4.ykimg.com/0130391F484D11DEFBA9D304C46FEDE35C6FB3-E017-547A-25E0-19A63945429B"
	}, {
		"name": "NEOTV-DOTA2频道",
		"id": "UMTM4MjMwNjU1Mg==",
		"avtar": "http://g4.ykimg.com/0130391F4552D78B772A2E149914BE41FC0699-9EA5-FB24-4001-A6115DF34154"
	}]
	start_urls = []
	for o in users:
		uri = "http://i.youku.com/u/%s/videos/fun_ajaxload/?__rt=1&__ro=&v_page=1&page_num=1&page_order=1&q=&last_str=" % o['id']
		start_urls.append(uri)
	return (start_urls, users)