import Command from './Command';

/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

/**
 * @param object THREE.Object3D
 * @param newUuid string
 * @constructor
 */

function SetUuidCommand(object, newUuid) {

	Command.call(this);

	this.type = 'SetUuidCommand';
	this.name = 'Update UUID';

	this.object = object;

	this.oldUuid = (object !== undefined) ? object.uuid : undefined;
	this.newUuid = newUuid;

};

SetUuidCommand.prototype = Object.create(Command.prototype);

Object.assign(SetUuidCommand.prototype, {

	constructor: SetUuidCommand,

	execute: function () {

		this.object.uuid = this.newUuid;
		this.editor.signals.objectChanged.dispatch(this.object);
		this.editor.signals.sceneGraphChanged.dispatch();

	},

	undo: function () {

		this.object.uuid = this.oldUuid;
		this.editor.signals.objectChanged.dispatch(this.object);
		this.editor.signals.sceneGraphChanged.dispatch();

	},

	toJSON: function () {

		var output = Command.prototype.toJSON.call(this);

		output.oldUuid = this.oldUuid;
		output.newUuid = this.newUuid;

		return output;

	},

	fromJSON: function (json) {

		Command.prototype.fromJSON.call(this, json);

		this.oldUuid = json.oldUuid;
		this.newUuid = json.newUuid;
		this.object = this.editor.objectByUuid(json.oldUuid);

		if (this.object === undefined) {

			this.object = this.editor.objectByUuid(json.newUuid);

		}

	}

});

export default SetUuidCommand;
