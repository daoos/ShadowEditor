﻿import SetGeometryCommand from '../../command/SetGeometryCommand';
import UI from '../../ui/UI';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function TorusGeometryPanel(editor, object) {

    var signals = editor.signals;

    var container = new UI.Row();

    var geometry = object.geometry;
    var parameters = geometry.parameters;

    // radius

    var radiusRow = new UI.Row();
    var radius = new UI.Number(parameters.radius).onChange(update);

    radiusRow.add(new UI.Text('半径').setWidth('90px'));
    radiusRow.add(radius);

    container.add(radiusRow);

    // tube

    var tubeRow = new UI.Row();
    var tube = new UI.Number(parameters.tube).onChange(update);

    tubeRow.add(new UI.Text('管长').setWidth('90px'));
    tubeRow.add(tube);

    container.add(tubeRow);

    // radialSegments

    var radialSegmentsRow = new UI.Row();
    var radialSegments = new UI.Integer(parameters.radialSegments).setRange(1, Infinity).onChange(update);

    radialSegmentsRow.add(new UI.Text('径向段数').setWidth('90px'));
    radialSegmentsRow.add(radialSegments);

    container.add(radialSegmentsRow);

    // tubularSegments

    var tubularSegmentsRow = new UI.Row();
    var tubularSegments = new UI.Integer(parameters.tubularSegments).setRange(1, Infinity).onChange(update);

    tubularSegmentsRow.add(new UI.Text('管长段数').setWidth('90px'));
    tubularSegmentsRow.add(tubularSegments);

    container.add(tubularSegmentsRow);

    // arc

    var arcRow = new UI.Row();
    var arc = new UI.Number(parameters.arc).onChange(update);

    arcRow.add(new UI.Text('弧长').setWidth('90px'));
    arcRow.add(arc);

    container.add(arcRow);


    //

    function update() {

        editor.execute(new SetGeometryCommand(object, new THREE[geometry.type](
            radius.getValue(),
            tube.getValue(),
            radialSegments.getValue(),
            tubularSegments.getValue(),
            arc.getValue()
        )));

    }

    return container;

};

export default TorusGeometryPanel;
