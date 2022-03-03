const { Tedis, TedisPool } = require("tedis");
var http = require('http');
var fs = require('fs');


var REDIS_URL = process.env.REDIS_URL
console.log("REDIS_URL ", REDIS_URL)



async function main(){
	try{
		const tedis = new Tedis({
		  port: 6379,
		  host: REDIS_URL
		});

		await tedis.get("getName").then(x=>{
			console.log("test",x)
		})

		http.createServer(async function (req, res) {
	    console.log(req.headers.host, "headers")
	    //res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	   		//res.end();
	   		await tedis.set("getName", "Gift Tshepang Mogeni")
			await tedis.get("getName").then(x=>{
			console.log("test",x)
			res.end(x)
			})
		}).listen(8084)
	}catch(err){
		console.log(err)
	}
	
}


function shutdown( signal ) {
	console.info( `[${signal}] shutting down...` )
	process.exit()
}

process.on( 'SIGINT', () => shutdown( 'SIGINT' ) )
process.on( 'SIGTERM', () => shutdown( 'SIGTERM' ) )

main()
