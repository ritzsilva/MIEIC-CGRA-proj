class MyBillboard extends CGFobject {
 
    constructor(scene) {
      super(scene);  
      this.baseplane = new MySquare(scene);
      this.leg1 = new MySquare(scene);
      this.leg2 = new MySquare(scene);
      this.plane= new MyPlane(scene, 30, true);
      this.delivered=0;
      this.initMaterials();
      this.shaders();
    }
    shaders(){
        this.shaderbillboard= new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
        this.texturebillboard = new CGFtexture(this.scene, "images/billboard.jpg");
		
        this.shaderbillboard.setUniformsValues({delivers: this.delivered});
    }

    initMaterials(){
		this.billboardBaseMaterial = new CGFappearance(this.scene);
        this.billboardBaseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.billboardBaseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.billboardBaseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.billboardBaseMaterial.setShininess(10.0);
        this.billboardBaseMaterial.loadTexture('images/billboard.jpg');
        this.billboardBaseMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.legMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.legMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.legMaterial.setShininess(10.0);
        this.legMaterial.loadTexture('images/rudder.jpg');
        this.legMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    update(){
        this.shaderbillboard.setUniformsValues({delivers: ++this.delivered});
    }
    reset() {
        this.delivered = 0;
        this.shaderbillboard.setUniformsValues({ delivers: 0 });
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(-10,0.5,0);
        this.scene.rotate(Math.PI/2, 0, 1 ,0);
        this.scene.pushMatrix();
        this.billboardBaseMaterial.apply();
        this.scene.translate(0,1,0);
        this.scene.scale(2,1,1);
        this.baseplane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.legMaterial.apply();
        this.scene.translate(-0.9,0,0);
        this.scene.scale(0.1,1,1);
        this.leg1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.legMaterial.apply();
        this.scene.translate(0.9,0,0);
        this.scene.scale(0.1,1,1);
        this.leg2.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.shaderbillboard);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75,0.01);
        this.scene.scale(1.5,0.2,1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        


    }
  
    
  }