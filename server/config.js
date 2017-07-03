module.exports = {
	name: 'AXIOS',
	port: 4444,
	browsersync_port: 3051,
	db: 'mongodb://127.0.0.1/axios',//mongodb://nodedemo1:nodedemo1@127.0.0.1:27017/nodedemo
	mongoose_debug: true,
	run_at_win: false,
	session_secret: 'I live. I die. I live again.',
	auth_cookie_name: 'AXIOS',
	session_user_check_interval: 3,
	use_redis: false,
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db: 8,
	isDedv: false,
	jwt_token_secret: 'Surrender-Omar',
	jwt_token_expire_days: 7,
}