const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})
app.use(express.static('./public'))

const arr = []
function mtoArray(m) {
	for (var [name, message] of m) {
		let obj = { name, message }
		arr.push(obj)
	}
}
app.post('/comment', (req, res) => {
	console.log(req.body)
	let m = new Map()
	let name = req.body.name
	let message = req.body.message
	m.set(name, message)
	mtoArray(m)
	res.send('提交成功')
})

//获取留言列表
app.get('/list', (req, res) => {
	res.json(arr)
})

app.listen(3000, () => {
	console.log('server is running')
})
