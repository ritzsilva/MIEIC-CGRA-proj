/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
        this.gui.add(this.scene, 'displayCylinder').name('Display Cylinder');
        this.gui.add(this.scene, 'displayTerrain').name('Display Terrain');
        this.gui.add(this.scene, 'sphereDisplay').name('Display Sphere');
        this.gui.add(this.scene, 'displayBillboard').name('Display Billboard');
        this.gui.add(this.scene, 'displayVehicle').name('Display Vehicle');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');

        this.initKeys();
        return true;
    }
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
        
    processKeyDown(event) {
    // called when a key is pressed down
    // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
    isKeyPressed(keyCode) {
    // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }



}