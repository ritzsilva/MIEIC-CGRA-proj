class MyAirShip extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.elipsoide= new MyElipsoide(scene, slices, stacks);
        this.gondola= new MyGondola(scene, slices,stacks);
        this.elipsoideSmallfront= new MyElipsoide(scene, slices, stacks);
        this.elipsoideSmallback= new MyElipsoide(scene, slices, stacks);
        this.ruddertop= new MyRudder(scene);
        this.rudderbottom= new MyRudder(scene);
        this.rudderleft= new MyRudder(scene);
        this.rudderright= new MyRudder(scene);
        this.propeller1= new MyPropeller(scene, slices, stacks);
        this.propeller2= new MyPropeller(scene, slices, stacks);
        this.initMaterials();
        
    }

    initMaterials(){
		this.baloon = new CGFappearance(this.scene);
        this.baloon.setAmbient(0.1, 0.1, 0.1, 1);
        this.baloon.setDiffuse(0.9, 0.9, 0.9, 1);
        this.baloon.setSpecular(0.1, 0.1, 0.1, 1);
        this.baloon.setShininess(10.0);
        this.baloon.loadTexture('images/baloon.jpg');
        this.baloon.setTextureWrap('REPEAT', 'REPEAT');

        this.gondolaMaterial = new CGFappearance(this.scene);
        this.gondolaMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.gondolaMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.gondolaMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        //this.gondolaMaterial.setEmission(1, 1, 1 ,1);
        this.gondolaMaterial.setShininess(10.0);
        this.gondolaMaterial.loadTexture('images/gondola.jpg');
        this.gondolaMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.rudderMaterial = new CGFappearance(this.scene);
        this.rudderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.rudderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rudderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.rudderMaterial.setShininess(10.0);
        this.rudderMaterial.loadTexture('images/rudder.jpg');
        this.rudderMaterial.setTextureWrap('REPEAT', 'REPEAT');

	}
 
    display(vel, direction){
        this.scene.pushMatrix();
        this.baloon.apply();
        this.elipsoide.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.gondolaMaterial.apply()
        this.scene.translate(0,-1.1,0);
        this.gondola.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2,-1.1,-0.70);
        this.scene.scale(0.08, 0.05, 0.08);
        this.elipsoideSmallfront.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2,-1.1,-0.70);
        this.scene.scale(0.08, 0.05, 0.08);
        this.elipsoideSmallback.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rudderMaterial.apply();
        this.scene.translate(0,0.3,-0.8);
        this.scene.rotate(direction*Math.PI/16, 0, 1, 0);
        this.scene.scale(0.80, 0.80, 0.80);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.ruddertop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rudderMaterial.apply();
        this.scene.translate(0,-0.3,-0.8);
        this.scene.rotate(direction*Math.PI/16, 0, 1, 0);
        this.scene.scale(0.80, 0.80, 0.80);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rudderbottom.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.rudderMaterial.apply();
        this.scene.translate(0.3,0,-0.8);
        this.scene.scale(0.80, 0.80, 0.80);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0,1);
        this.rudderright.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rudderMaterial.apply();
        this.scene.translate(-0.3,0,-0.8);
        this.scene.scale(0.80, 0.80, 0.80);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0,1);
        this.rudderleft.display();
        this.scene.popMatrix();
       
       
        this.scene.pushMatrix();
        this.scene.translate(-0.2,-1.1,-0.8);
        this.scene.rotate(vel+0.05, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.propeller1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2,-1.1,-0.8);
        this.scene.rotate(vel+0.05, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.propeller2.display();
        this.scene.popMatrix();

    }
    

    
    
}