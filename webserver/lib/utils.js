var elasticsearch = require('elasticsearch');
var moment		  = require('moment');

var client = new elasticsearch.Client({
	host: 'es.thnuclub.com'
});

var maxResults = 500;
var pageSize = 12;

module.exports = {
	search: function(q, callback) {
		client.search({
			index: 'kandota_v1',
			type: 'video',
			body: q
		}).then(function(body) {
			total = body.hits.total
			hits = []
			body.hits.hits.forEach(function(o) {
				if(o._source.created_at)
					o._source.created_at = moment(o._source.created_at).format('YYYY-MM-DD HH:mm:ss');
					if (o._source.video_id)
						o._source.href = "http://v.youku.com/v_show/id_"+o._source.video_id+".html";
				hits.push(o._source);
			})
			return callback(null, {total: Math.min(total, maxResults), hits: hits});
		}, function(err) {
			return callback(null, {total: 0, hits: []})
		})
	},
	page: function(params) {
		var from = 0;
		if (params.page) from = Math.min(+params.page, Math.round(maxResults/pageSize));
		return {from: from, size: pageSize}
	},
	common: function(params, tag) {
		var page = module.exports.page(params);
		var q = {
			from: page.from*pageSize,
			size: page.size,
			query: {
				bool: {
					must: []
				}
			},
			sort: {
				created_at: "desc"
			}
		};
		if (params.q) {
			q.query.bool.must.push({
				query_string: {
					fields: ["title"],
					query: '\"'+params.q+'\"'
				}
			});
		}
		if (params.uid) {
			q.query.bool.must.push({
				query_string: {
					default_field: "uid",
					query: params.uid
				}
			})
		}
		if (tag) {
			q.query.bool.must.push({
				term: {
					tag: tag
				}
			})
		}
		return q;
	},
	helper: function(params, total, action) {
		var pages = {};
		if (!params.page) params.page = 1;
		params.page = +params.page;
		if (params.page > 1) {
			if (action)
				pages.prev = "/"+action+"?page="+(+params.page-1)+"&uid="+params.uid
			else
				pages.prev = "/?page="+(+params.page-1)+"&uid="+params.uid
			if (params.q) {
				pages.prev = pages.prev + "&q=" + params.q
			}
		}
		if (params.page < Math.floor(total / pageSize) && total != pageSize) {
			var np = params.page + 1;
			if (action)
				pages.next = "/"+action+"?page="+np+"&uid="+params.uid;
			else
				pages.next = "/?page="+np+"&uid="+params.uid;
			if (params.q) {
				pages.next = pages.next + "&q=" + params.q
			}
		}
		return pages
	}
}