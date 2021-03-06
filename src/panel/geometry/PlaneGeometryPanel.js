﻿import SetGeometryCommand from '../../command/SetGeometryCommand';
import UI from '../../ui/UI';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function PlaneGeometryPanel(editor, object) {

    var signals = editor.signals;

    var container = new UI.Row();

    var geometry = object.geometry;
    var parameters = geometry.parameters;

    // width

    var widthRow = new UI.Row();
    var width = new UI.Number(parameters.width).onChange(update);

    widthRow.add(new UI.Text('宽度').setWidth('90px'));
    widthRow.add(width);

    container.add(widthRow);

    // height

    var heightRow = new UI.Row();
    var height = new UI.Number(parameters.height).onChange(update);

    heightRow.add(new UI.Text('高度').setWidth('90px'));
    heightRow.add(height);

    container.add(heightRow);

    // widthSegments

    var widthSegmentsRow = new UI.Row();
    var widthSegments = new UI.Integer(parameters.widthSegments).setRange(1, Infinity).onChange(update);

    widthSegmentsRow.add(new UI.Text('宽度段数').setWidth('90px'));
    widthSegmentsRow.add(widthSegments);

    container.add(widthSegmentsRow);

    // heightSegments

    var heightSegmentsRow = new UI.Row();
    var heightSegments = new UI.Integer(parameters.heightSegments).setRange(1, Infinity).onChange(update);

    heightSegmentsRow.add(new UI.Text('高度段数').setWidth('90px'));
    heightSegmentsRow.add(heightSegments);

    container.add(heightSegmentsRow);


    //

    function update() {

        editor.execute(new SetGeometryCommand(object, new THREE[geometry.type](
            width.getValue(),
            height.getValue(),
            widthSegments.getValue(),
            heightSegments.getValue()
        )));

    }

    return container;

};

export default PlaneGeometryPanel;
