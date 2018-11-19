var express = require('express')
var wkhtmltopdf = require('wkhtmltopdf')
var fs = require('fs-extra')
var md5 = require('md5')
var app = express()

app.get('/htmlToPdf', function (req, res) {
	if (!req.query.url) {
		res.status(500).send({
			err: 'Missing parameter url!',
			example: '/htmlToPdf?url=https://google.com&margin=0&pageSize=A2'
		})
	} else {
		if (!fs.existsSync('tmp')) {
			fs.mkdirSync('tmp')
		}

		let hash = md5(new Date())
		let folderPath = 'tmp/' + hash
		let filePath = folderPath + '/outputFile.pdf'

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath)
		}

		let options = {
			output: filePath,
			pageSize: req.query.pageSize || 'A4'
		}

		if (req.query.margin) {
			options = {
				...options,
				'margin-top': req.query.margin,
				'margin-bottom': req.query.margin,
				'margin-left': req.query.margin,
				'margin-right': req.query.margin
			}
		}

		wkhtmltopdf(req.query.url, options, () => {
			if (fs.existsSync(filePath)) {
				res.sendFile(filePath, {
					root: __dirname
				})
			} else {
				res.status(500).send({
					err: 'Something broke!'
				})
			}
		})

		setTimeout(() => {
			fs.remove(folderPath)
		}, 1000 * 15);
	}
})

app.listen(3000, function () {
	console.log('HtmlToPdf app listening on port 3000!')
})