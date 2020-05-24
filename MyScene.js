/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);


        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,30, 10);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this,16,8);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);

        //supplies
        this.supply1 = new MySupply(this);
        this.supply2 = new MySupply(this);
        this.supply3 = new MySupply(this);
        this.supply4 = new MySupply(this);
        this.supply5 = new MySupply(this);
        this.supplies = [this.supply1,this.supply2, this.supply3, this.supply4,this.supply5];
        this.lastUpdate = 0;
        this.nSuppliesDelivered = 0;

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayNormals = false;
        this.displayCylinder = false;
        this.sphereDisplay = false;
        this.displayVehicle = true;
        this.displayTerrain = true;
        this.displayBillboard = true;
        this.displayCube = true;
        this.selectedTexture = 0;
        this.speedFactor = 0.5;
        this.scaleFactor = 1;

        //earth
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(1,1,1,1);
        this.earthMaterial.setDiffuse(0,1,1,1);
        this.earthMaterial.setSpecular(0, 0, 0, 1);
        this.earthMaterial.setShininess(10.0);
        this.texture = new CGFtexture(this, 'images/earth.jpg');
        this.earthMaterial.setTexture(this.texture);
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureIds = {'Garden': 0, 'Desert': 1};
        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8,1.0);
        this.setShininess(10.0);
    }
    
    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        var t=0;
        // Check for key codes e.g. in https://keycode.info/
        if(!this.vehicle.isInAuto){
            if (this.gui.isKeyPressed("KeyW")) {
                text+=" W ";
                keysPressed=true;
                if (this.vehicle.vel == 0) {
                    this.vehicle.vel = 0.05;
                }
                this.vehicle.accelerate(this.speedFactor*this.vehicle.vel);
                this.vehicle.turndirection=0;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text+=" S ";
                keysPressed=true;
                this.vehicle.accelerate(-this.speedFactor*0.3*this.vehicle.vel);
                this.vehicle.turndirection=0;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text+=" A ";
                keysPressed=true;
                this.vehicle.turn(5);
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text+=" D ";
                keysPressed=true;
                this.vehicle.turn(-5);
            }
            if (this.gui.isKeyPressed("KeyR")) {
                text+=" R ";
                keysPressed=true;
                this.vehicle.reset();
                for(var i = 0; i < 5; i++){
                    this.supplies[i].reset();
                }
                this.nSuppliesDelivered=0;
                this.billboard.reset();
            }
            if (this.gui.isKeyPressed("KeyP")) {
                text+=" P "; 
                this.vehicle.autopilot();
                keysPressed=true;
            }
            if(this.gui.isKeyPressed("KeyL")){
                text+=" L ";
                keysPressed=true;
                this.billboard.update();
                if(this.nSuppliesDelivered<=4){
                    this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.z);
                } 
                this.nSuppliesDelivered++;
            }
        }
        else{
            if (this.gui.isKeyPressed("KeyP")) {
                text+=" P ";
                this.vehicle.isInAuto=false;
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyR")) {
                text+=" R ";
                keysPressed=true;
                this.vehicle.reset();
                for(var i = 0; i < 5; i++){
                    this.supplies[i].reset();
                }
                this.nSuppliesDelivered=0;
                this.billboard.reset();
            }
        }
        
        //if(keysPressed)
        //    this.vehicle.update();
        if (keysPressed){
            console.log(text);
        }
       
    }
        

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        if (this.lastUpdate == 0)
            this.lastUpdate = t;
        let timepassed = t - this.lastUpdate;
        this.lastUpdate = t;

        this.checkKeys();
        
        this.vehicle.update(timepassed);
        for(var i = 0; i < 5; i++){
            this.supplies[i].update(timepassed);
        }
    }

    updateAppliedTexture() {
        this.cube.updateAppliedTexture();
    }
    
   

    display() {
        
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
       
        if(this.displayCylinder){
            this.pushMatrix();
            this.translate(0,5,0);
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.cylinder.display();
            this.popMatrix();
        }

        if(this.displayCube){
            this.pushMatrix();
            this.cube.display();
            this.popMatrix();
        }
        if(this.displayTerrain){
            this.pushMatrix();
            this.terrain.display();
            this.popMatrix();
        }
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

       
        this.setDefaultAppearance();
    
        
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if (this.sphereDisplay){
            this.pushMatrix();
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.earthMaterial.apply();
            this.sphere.display();
            this.popMatrix();
        }
        
        if(this.displayVehicle){
            this.pushMatrix();
            this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
            this.vehicle.display();
            this.popMatrix();
        }
        

        if (this.displayNormals)
            this.cylinder.enableNormalViz();
        else
            this.cylinder.disableNormalViz();


        for(var i = 0; i < 5; i++){
                    this.supplies[i].display();
        }
    

        if(this.displayBillboard){
            this.pushMatrix();
            this.billboard.display();
            this.popMatrix();
        }

        
        
        // ---- END Primitive drawing section
        this.setActiveShader(this.defaultShader);
    }

}