const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://Gym:matheus13012003@cluster0-j5eik.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, (err) => {
	if (err) return console.log(`(x) Não consegui me conectar no banco de dados \n${err.stack}`)
	console.log("(>) Eu me conectei no meu banco de dados!")
})

var RegistradorSchema = new mongoose.Schema({
	_id: String,
	membrosRegistrados: [{
		_id: String,
		genero: String,
		timestamp: Number
	}]
});

let Cargo = new mongoose.Schema({
	_id: { type: String }
})
let Canal = new mongoose.Schema({
	_id: { type: String }
})
let Guild = new mongoose.Schema({
	_id: { type: String },
	//extras
	linkanuncio: { type: String, default: ' ' },
	prefix: { type: String, default: '-' },
	partner: { type: Boolean, default: false },
	//módulos welcome,contador etc
	welcomeModule: { type: Boolean, default: false },
	saidaModule: { type: Boolean, default: false },
	leaveModule: { type: Boolean, default: false },
	vip: { type: Boolean, default: false },
	count: { type: Boolean, default: false },
	antInvite: { type: Boolean, default: false },
	sugesModule: {type: Boolean, default: false},
	//messagem dos módulos
	welcomeMessage: { type: String, default: "" },
	countMessage: { type: String, default: "{azul}" },
	leaveMessage: { type: String, default: "" },
	saidaMessage: { type: String, default: "" },
	//canais para info:
	infoantinv: { type: String, default: "" },
	countChannel: { type: String, default: "" },
	sugesChannel: { type: String, default: "" },
	channelWelcome: { type: String, default: "" },
	channelLeave: { type: String, default: "" },
	channelRegister: { type: String, default: "" },
	channelsaida: { type: String, default: "" },
	//config de role para registro
	masculino: { type: String, default: "" },
	feminino: { type: String, default: "" },
	registrado: { type: String, default: "" },
	nbinario: { type: String, default: "" },
	novato: { type: String, default: "" },
	registradores: [RegistradorSchema],
})
let User = new mongoose.Schema({
	_id: { type: String },
	blacklist: { type: Boolean, default: false },
	blacklistReason: { type: String, default: null },
	rep: { type: Number, default: 0 },
	repTime: { type: String, default: "000000000000" },
	gifban: { type: String, default: "" },
	cor: { type: String, default: "" },
	vip: { type: Boolean, default: false },
	strike: { type: Number, default: 0 },
	staff: { type: Boolean, default: false }
})

let userMutados = new mongoose.Schema({
	_id: String,
	server: String,
	time: Number,
	channel: String
})

let Guilds = mongoose.model("Guilds", Guild)
exports.Guilds = Guilds
let Users = mongoose.model("Users", User)
exports.Users = Users
let Cargos = mongoose.model("Cargo", Cargo)
exports.Cargo = Cargos
let Canals = mongoose.model("Canal", Canal)
exports.Canal = Canals
let Mutados = mongoose.model("Mutados", userMutados)
exports.Mutados = Mutados