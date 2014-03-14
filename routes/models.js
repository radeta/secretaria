var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
//mongoose.connect('mongodb://localhost/secretariaSalud');
//mongoose.connect('mongodb://consulting:1q2w3e4r@ds037737.mongolab.com:37737/secretaria');
mongoose.connect('mongodb://secretaria:1q2w3e4r@ds033569.mongolab.com:33569/ss-cordoba');
var db =	mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log('conexion establecida');
	console.log('Database secretariaSalud');
});

var universidadSchema = new Schema({
	nombre : {type : String, required: true},
	departamento : {type : String, required: true},// traer de una tabla
	ciudad: {type : String, required: true}// traer de una tabla
});

var municipioSchema = new Schema({
	nombre : {type: String, required: true}
});

var tipoProfesionalSchema = new Schema({
	tipo : {type : String, required: true},
	descripcion: {type : String, default:''}
});

var misTitulosSchema = new Schema({
	_medico : {type:Schema.Types.ObjectId, ref:'medicos'},
	titulo : {type : String, required: true},
	descripcion : {type: String, defaul:''},
	_universidad : {type:Schema.Types.ObjectId, ref:'universidades'},
	fechaObtenion : {type: Date, required:true}
});

var medicoSchema = new Schema({
	tipoIdent : {type: String, required:true, enum: ['TI', 'CC', 'Pasaporte']},
	identificacion : {type : String, index : true, required:true, unique:true},
	nombres : {type: String, required:true},
	apellidos : {
		primero : {type: String, required:true},
		segundo : {type: String, required:true}
	},
	NtarjetaProf: {type: String, required:true, unique:true},
	sexo: {type: String, enum: ['M', 'F']},
	fehaNaimiento: {type: Date, required:true},
	residencia : {
		municipio: {type: String, required:true},
		direccion: {type: String, required:true}
	},
	telefono:{
		celular : {type: String, required:true},
		fijo: {type: String, required:true}
	},
	nacionalidad:{type:String, required:true, enum:['Colombiano', 'Extranjero', 'Nacionalizado']},
	estadoRegistro:{type:String, required:true, enum:['estudio', 'aprovado', 'desaprovado']},
	_tipoProfesional: {type:Schema.Types.ObjectId, ref:'tipoProfesional'},
	_lugarTrabajo: {type:Schema.Types.ObjectId, ref:'lugarTrabajo'},
	labora:{type:String, required:true, enum:['si', 'no']},
	evidencias: {type: String, required:true}
});

var lugarTrabajoSchema = new Schema({
	nit:{type:String, required:true, unique:true, default:'sin definir'},
	nombreClinica: {type: String, required:true, default:'sin definir'},
	ubicacion:{
		_municipio: {type:Schema.Types.ObjectId, ref:'municipios', default:'53023e1320a96f8faa64d949'},
		direccion: {type: String, required:true, default:'sin definir'}
	},
	telefono:{
		celular : {type: String, default:''},
		fijo: {type: String, required:true, default:'sin definir'}
	}
});

var AdminSchema = new Schema({
	usuario:{type : String, required:true},
	pass:{type : String, required:true}
});

var universidades = mongoose.model('universidades', universidadSchema);
var lugarTrabajo= mongoose.model('lugarTrabajo', lugarTrabajoSchema);
var municipios = mongoose.model('municipios', municipioSchema);
var tipoProfesional = mongoose.model('tipoProfesional', tipoProfesionalSchema);
var misTitulos = mongoose.model('misTitulos', misTitulosSchema);
var medicos = mongoose.model('medicos', medicoSchema);
var admins = mongoose.model('admins', AdminSchema);

exports.universidades = universidades;
exports.lugarTrabajo = lugarTrabajo;
exports.municipios = municipios;
exports.tipoProfesional = tipoProfesional;
exports.misTitulos = misTitulos;
exports.medicos = medicos;
exports.admins = admins;